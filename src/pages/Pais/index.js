import React,  { useEffect, useState } from 'react';
//import { Collapse, Button, CardBody, Card } from 'reactstrap';
import {userFetch} from '../../hooks/userFetch'
import {ContainerPage, TitlePage,ButtonsPage} from "../../Components/Main"
import { useHistory } from "react-router"
import { Link} from 'react-router-dom'

//material UI
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import AppsIcon from '@material-ui/icons/Apps';

import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
        <ContainerPage>
          <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-prevent-tabpanel-${index}`}
        aria-labelledby={`scrollable-prevent-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
      </ContainerPage>
   );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `scrollable-prevent-tab-${index}`,
      'aria-controls': `scrollable-prevent-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  }));

  //accordion
  
const Accordion = withStyles({
    root: {
      border: '1px solid rgba(0, 0, 0, .125)',
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 'auto',
      },
    },
    expanded: {},
  })(MuiAccordion);
  
  const AccordionSummary = withStyles({
    root: {
      backgroundColor: 'rgba(0, 0, 0, .03)',
      borderBottom: '1px solid rgba(0, 0, 0, .125)',
      marginBottom: -1,
      minHeight: 56,
      '&$expanded': {
        minHeight: 56,
      },
    },
    content: {
      '&$expanded': {
        margin: '12px 0',
      },
    },
    expanded: {},
  })(MuiAccordionSummary);
  
  const AccordionDetails = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiAccordionDetails);




const Page = () => {
    
    const [collapse, setCollapse] = useState(false);
  

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const [vacina, setVacina] = useState(false);
  

  
    const handleChange = (event, newValue) => {
      setValue(newValue);
      console.log("no change do TAB     ", newValue)
      if (newValue==1) {
      setVacina(true);} else {setVacina(false)}

      console.log("no change do TAB     ", vacina)
    };

    console.log("fora do change",value)

    //acordeon
    const [expandedA, setExpanded] = React.useState(false);
  
    const handleChangeA = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    
      
  let history = useHistory();
  let url = "";

  

   if (value==0){
     url = 'https://covid-api.mmediagroup.fr/v1/cases?country=' + history.location.state.dados
   

    }
   else{
    url='https://covid-api.mmediagroup.fr/v1/vaccines?country=' + history.location.state.dados

   }

   const { data } = userFetch(url)
 
   if (!data){
       return  <h1>Carregando...</h1>
   }



    const renderAccordion = (country) => {
        console.log("dentro do render:", country)

        if (country[0]=="All") {
        return(   
     
       <Accordion square expandedA={expandedA === '{country[0]}'} onChange={handleChangeA('{country[0]}')}>
        <AccordionSummary aria-controls="{country[country[0]}]}-content" id={country[0]}>
          <Typography>{country[1].country}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>

              
             
            <p>População            : {country[1].population}</p>
            <p>Casos confirmados    : {country[1].confirmed}</p>
            <p>Total de Recuperados : {country[1].recovered}</p>
            <p>Total de Mortes      : {country[1].deaths}</p>
            <p>Expectativa de Vida  : {country[1].life_expectancy}</p>
                         
          </Typography>
        </AccordionDetails>
      </Accordion>)}
      else{
          return(
                   
       <Accordion square expandedA={expandedA === '{country[0]}'} onChange={handleChangeA('{country[0]}')}>
       <AccordionSummary aria-controls="{country[country[0]}]}-content" id={country[0]}>
         <Typography>{country[0]}</Typography>
       </AccordionSummary>
       <AccordionDetails>
         <Typography>
             
            
         
           <p>Casos confirmados    : {country[1].confirmed}</p>
           <p>Total de Recuperados : {country[1].recovered}</p>
           <p>Total de Mortes      : {country[1].deaths}</p>
          
                        
         </Typography>
       </AccordionDetails>
     </Accordion>)
        
      }

      
    }


    const vacinaAccordion = (country) => {
        console.log("dentro do render de vacina:", country)

       
        return(   
     
       <Accordion square expandedA={expandedA === '{country[0]}'} onChange={handleChangeA('{country[0]}')}>
        <AccordionSummary aria-controls="{country[country[0]}]}-content" id={country[0]}>
          <Typography>{country[1].country}/{country[1].abbreviation}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>

            <p>População            : {country[1].population}</p>
            <p>Parcial de Vacinados : {country[1].people_partially_vaccinated}</p>
            <p>Expectativa de Vida  : {country[1].life_expectancy}</p>
            <p>Continente           : {country[1].continent}</p>
                         
          </Typography>
        </AccordionDetails>
      </Accordion>)
   

      
    }

/*     let rows = []

   
    for(const chave in data){
        if (chave !== "All"){
          rows.push( <ButtonsPage color="primary" onClick={chave} style={{ marginBottom: '1rem' }}>{chave}</ButtonsPage>,<br></br> )
          
        }
          
    } */
  
    return (
        <ContainerPage>
     
     <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="off"
          aria-label="scrollable prevent tabs example"
        >
          <Tab icon={<AppsIcon />} aria-label="dados do Pais" {...a11yProps(0)} />
         <Tab icon={<LocalHospitalIcon />} aria-label="Dados sobre Vacinação" {...a11yProps(1)} />

        </Tabs>
      </AppBar>
      
      <Link to="/">Voltar para a Pesquisa</Link>
     
      <TabPanel value={value} index={0} >

          {Object.entries(data).map(renderAccordion)}

      </TabPanel>
 
         

      <TabPanel value={value} index={1}>

      {Object.entries(data).map(vacinaAccordion)}
        
      </TabPanel>
   
     
    
    </div>

      </ContainerPage>
    );

    
}

export default Page;