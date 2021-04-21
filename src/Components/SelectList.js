import React, {Fragment, state,useEffect,  useState} from "react"
import {userFetch} from '../hooks/userFetch'

import Select, { components } from 'react-select'

import {useHistory} from 'react-router-dom'



function SelectList  () {

    const { data } = userFetch('https://covid-api.mmediagroup.fr/v1/cases')

    let history = useHistory();
    
    const handleChange = ( v) => {

      history.push({
        pathname: '/pais/cases',
       
        search: '?country='+v.label,
        state: { dados: v.label }

      });

      

      

    };

    
    if (!data){
        return  <h1>Carregando...</h1>
    }

   
   let paises=[]
    
    for( const chave in data){
    
          paises.push({ value: chave, label: chave })
   

      }
     

      const menuHeaderStyle = {
        padding: '8px 12px',
        background: 'blue',
        color: 'black',
      };
      
      const MenuList = props => {
        return (
          <components.MenuList {...props}>
            <div style={menuHeaderStyle}>Selecione um Pais</div>
            {props.children}
          </components.MenuList>
        );
      };


      
      
        
      return (
        
         
         <Select 
                name="pais"
                options={paises}
                option={paises}
                onChange={handleChange}
                width='570px'
                menuColor='red'
                closeMenuOnSelect={false}
                components={{ MenuList }}       

  
            />
            
        )

      };
       

           


export default SelectList;