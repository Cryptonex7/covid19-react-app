import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getAllRestaurants } from '../../services/restaurants/actions';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import styles from "../../assets/jss/materialStyles/components/headerLinksStyle.js";
import { getDashboardData } from '../../services/dashboard/actions';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider, } from '@material-ui/pickers';
import { primaryColor } from '../../assets/jss/materialStyles';
const useStyles = makeStyles(styles);

export default function SearchBox() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [rest, setRest] = useState();
    const [toDate, setToDate] = useState( new Date());
    const [addTo, setAddTo] = useState(false);
    const [addFrom, setAddFrom] = useState(false);
    const [addRest, setAddRest] = useState(false);
    const [fromDate, setFromDate] = useState( new Date());
    const loading = open && options.length === 0;
    const restState = useSelector(state => state.restaurants.restaurants)
    const dispatch = useDispatch();

    const handleSearch = () => {
        if (!addRest && !addFrom && !addTo) 
            dispatch(getDashboardData(null, null, null))
        else if (!addRest && !addFrom && addTo)
            dispatch(getDashboardData(null, null, toDate.getTime() / 1000))
        else if (!addRest && addFrom && !addTo)
            dispatch(getDashboardData(null, fromDate.getTime() / 1000, null))
        else if (!addRest && addFrom && addTo)
            dispatch(getDashboardData(null, fromDate.getTime() / 1000, toDate.getTime() / 1000))
        else if (addRest && !addFrom && !addTo)
            dispatch(getDashboardData(rest._id, null, null))
        else if (addRest && !addFrom && addTo)
            dispatch(getDashboardData(rest._id, null, toDate.getTime() / 1000))
        else if (addRest && addFrom && !addTo)
            dispatch(getDashboardData(rest._id, fromDate.getTime() / 1000, null))
        else if (addRest && addFrom && addTo)
            dispatch(getDashboardData(rest._id, fromDate.getTime() / 1000, toDate.getTime() / 1000))
    }

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await dispatch(getAllRestaurants());
            if (active) {
                setOptions(restState.map(rest => rest));
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <GridContainer direction={"row"} xs={12}>
                <GridItem xs={12} sm={6} md={4}>
                    <FormControlLabel
                        control={
                        <Checkbox checked={addRest} onChange={(e) => setAddRest(e.target.checked)} className={classes.checked}/>
                        }
                        label="Select Restaurant"
                    />
                    {addRest && <Autocomplete
                        className = {classes.root}
                        onChange = {(event, value) => setRest(value)}
                        id="asynchronous-rest-call"
                        open={open}
                        onOpen={() => {
                            setOpen(true);
                        }}
                        onClose={() => {
                            setOpen(false);
                        }}
                        getOptionSelected={(option, value) => option.name === value.name}
                        getOptionLabel={option => option.name}
                        options={options}
                        loading={loading}
                        renderInput={params => (
                            <TextField
                            {...params}
                            label="Search Restaurants"
                            variant="outlined"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                                ),
                            }}
                            />
                        )}
                    />}
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                    <FormControlLabel
                        control={
                        <Checkbox checked={addFrom} onChange={(e) => setAddFrom(e.target.checked)} className={classes.checked} />
                        }
                        label="Add Date From"
                    />
                    {addFrom && <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Data From"
                        format="dd/mm/yyyy"
                        value={fromDate}
                        onChange={(date) => setFromDate(date)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />}
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                    <FormControlLabel
                        control={
                        <Checkbox checked={addTo} onChange={(e) => setAddTo(e.target.checked)} className={classes.checked}/>
                        }
                        label="Add Date To"
                    />
                    {addTo && <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Data To"
                        format="dd/mm/yyyy"
                        value={toDate}
                        onChange={(date) => setToDate(date)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />}
                </GridItem>
                <GridItem xs={12} sm={6} md={2}>
                    <Button 
                    color={primaryColor[0]} 
                    variant="outlined"
                    onClick={handleSearch}>
                        {!addTo && !addFrom && !addRest ? "Refresh" : "Search"}
                    </Button>
                </GridItem>
            </GridContainer>
            {rest &&
                <GridContainer direction={"row"} xs={12}>
                    <GridItem xs={12}>
                        {`${rest.name} | ${rest.address.city.name}, ${rest.address.city.state} | ${rest.address.country.name}`}
                    </GridItem>
                </GridContainer>
            }
            
        </MuiPickersUtilsProvider>
    );
}