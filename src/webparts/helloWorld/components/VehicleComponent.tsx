import React, { Fragment, useEffect, useRef, useState } from 'react';
import styles from './HelloWorld.module.scss';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { EditRegular, DeleteRegular } from '@fluentui/react-icons';
import { IDataGrid, IVehiclePageInfo } from './IHelloWorldProps';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { 
  TextField, 
  PrimaryButton, 
  Stack, 
  IStackTokens, 
  IStackStyles,
  Dropdown} from '@fluentui/react';
import { __metadata } from 'tslib';

interface IAddVehicleForm {
  id: number;
  make: string;
  vin: string;
  model: string;
  trim: string;
  price: number;
}

interface IMakeItem {
  id: string | number;
  displayName: string;
}

const initialState = {
  id: 0,
  make: '',
  vin: '',
  model: '',
  trim: '',
  price: ''
};

export default function VehicleComponent(props: IVehiclePageInfo) {

  const [formData, setFormData] = useState(initialState);  

  const initialData: IDataGrid[] = [];
  const [dataGrid, setDataGrid] = useState(initialData);
  
  const initialDataMakeItem: IMakeItem[] = [];
  const [makeDropDown, setMakeDropDown] = useState(initialDataMakeItem);
  const siteUrl = `${props.context.pageContext.web.absoluteUrl}/sites/allcompany`;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData(initialState);
  };

  //Fetching data from the SharePoint 'Vehicles' list
  const fetchData = async (apiUrl: string) => {    
    const response: SPHttpClientResponse = await props.context.spHttpClient.get(
      apiUrl,
      SPHttpClient.configurations.v1
    );

    if(response.ok) {
      const data = await response.json();
      const items = data.value; //sharepoint returns the array in the 'value' property      
      return items;
    } else {
      console.error("Error fetching items:", await response.text());
    }
  }

  const loadVehicleListForDataGrid = async () => {
    const apiUrl = `${siteUrl}/_api/web/lists/getbytitle('Vehicles')/items?$select=Id,Make,VIN,Model,Trim`;
    const result: IDataGrid[] = await fetchData(apiUrl);
    setDataGrid(result);
  }

  useEffect(() => {       
    loadVehicleListForDataGrid();    
  }, []);

  // Layout spacing
  const stackTokens: IStackTokens = { childrenGap: 15 };
  const stackStyles: IStackStyles = { root: { width: 400, margin: '20px auto' } };
  
  /**
   * ADD new record handler - Form submit
   * @param event 
   * @returns 
   */
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {      
      if (!formRef.current) return;

      const formData: FormData = new FormData(formRef.current);
      const formValues: IAddVehicleForm = Object.fromEntries(formData.entries()) as unknown as IAddVehicleForm;

      //Use SharePoint API to udpate the 'Vehicles' list
      const url = `${props.context.pageContext.web.absoluteUrl}/sites/allcompany/_api/web/lists/getbytitle('Vehicles')/items`;

      const body = {
        __metadata: {
          type: `SP.Data.VehiclesListItem`
        },
        Make: formValues.make,
        VIN: formValues.vin,
        Model: formValues.model,
        Trim: formValues.trim,
        Price: formValues.price
      }
      
      if(formValues.id === 0) {
        performAdd(url, body);
      } else {
        performUpdate(formValues.id, url, body);
      }      
    } catch(error) {
      console.error(`Error while adding new vehicle information`);
    }
  }

  //Add new vehicle handler
  const performAdd = async (url: string, body: any) => {
    try {
      const response: SPHttpClientResponse = await props.context.spHttpClient.post(
        url,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=verbose',
            'Content-type': 'application/json;odata=verbose',
            'odata-version': ''
          },
          body: JSON.stringify(body)
        }
      );

      if(response.ok) {      
        handleReset();
        loadVehicleListForDataGrid();  
      }
    } catch(error) {
      if (error instanceof Error) {        
        console.error(error.message);
      } else {        
        console.error("An unexpected error occurred", error);
      }
    }    
  }

  //Update vehicle handler
  const performUpdate = async (id: number, url: string, body: any) => {
    const { __metadata, ...bodyWithoutMetadata } = body;
    const response: SPHttpClientResponse = await props.context.spHttpClient.post(
      `${url}(${id})`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'Content-type': 'application/json;odata=nometadata',
          'odata-version': '',
          'IF-MATCH': '*',
          'X-HTTP-Method': 'MERGE'
        },
        body: JSON.stringify(bodyWithoutMetadata)
      }
    );

    if(response.ok) {
      alert("Vehicle Updated Successfully");
      handleReset();
      loadVehicleListForDataGrid();  
    } else {
      const error = await response.json();
      console.error(error);
      alert("Error: " + error.error.message.value);
    }
  }

  /**
   * Delete vehicle handler
   * @param id 
   */
  const handleDelete = async (id: string) => {    
    alert(`Delete: ${id}`);
    const endpoint: string = `${props.context.pageContext.web.absoluteUrl}/sites/allcompany/_api/web/lists/getbytitle('Vehicles')/items(${id})`;

    const headers: HeadersInit = {
      'X-HTTP-Method': 'DELETE',
      'IF-MATCH': '*'
    };

    try {
      const response: SPHttpClientResponse = await props.context.spHttpClient.post(
        endpoint,
        SPHttpClient.configurations.v1,
        { headers: headers }
      );

      if (response.ok) {
        console.log(`Item ${id} deleted successfully.`);  
        loadVehicleListForDataGrid();      
      } else {
        const error = await response.json();
        console.error("Error deleting item:", error);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  }

  /**
   * Edit Vehiele handler
   */
  const handleEdit = async (id: string) => {
    const apiUrl = `${siteUrl}/_api/web/lists/getbytitle('Vehicles')/items(${id})`;
    try {
      const response: SPHttpClientResponse = await props.context.spHttpClient.get(
        apiUrl,
        SPHttpClient.configurations.v1
      );

      if (response.ok) {
        const item = await response.json();    
        setFormData({
          id: item?.Id,
          make: item?.Make,
          vin: item?.VIN,
          model: item?.Model,
          trim: item?.Trim,
          price: item?.Price
        });
      }

    } catch(error) {
      alert(error);
    }
  }

  return(
    <div style={{paddingTop:'30px'}}>
      <h2 style={{color:'blue'}}>Task #2</h2>
      <p>
        This below is the Vehicle Entry Form performs ADD / UPDATE / DELTE operations.
        <p>- <strong>GET</strong> the data from SharePoint List</p>
        <p>- <strong>ADD</strong> new vehicle to SharePoint List</p>
        <p>- <strong>UPDATE</strong> the vehicle info to SharePoint List</p>
        <p>- <strong>DELETE</strong> the vehicle data from SharePoint List</p>
      </p>
      <div>
        <form ref={formRef} onSubmit={handleSubmit}>
          <Stack styles={stackStyles} tokens={stackTokens}>
          <h2>Vehicle Entry Form</h2>           
            <TextField name="id" styles={{ root: { display: 'none' } }} value={String(formData.id)}/>
            <TextField label="Make" name="make" placeholder="e.g. Toyota" required value={formData.make} onChange={handleChange} />
            <TextField label="VIN" name="vin" placeholder="17-character VIN" value={formData.vin} onChange={handleChange} />
            <TextField label="Model" name="model" placeholder="e.g. Camry" value={formData.model} onChange={handleChange} />
            <TextField label="Trim" name="trim" placeholder="e.g. XLE" value={formData.trim} onChange={handleChange} />
            <TextField label="Price" name="price" prefix="$" type="number" value={formData.price} onChange={handleChange} />
            <Stack horizontal tokens={{ childrenGap: 10 }}>
              <PrimaryButton type="submit" text={formData.id ? "Update Vehicle Info" : "Add Vehicle"}/>              
              <PrimaryButton text="Clear" onClick={handleReset} />
            </Stack>
          </Stack>
        </form>
      </div>

      <div>
        <h2>Vehicle stock list:</h2>
        <PrimaryButton text="Refresh" onClick={loadVehicleListForDataGrid} allowDisabledFocus />
      </div>
      <table className={styles['vehicle-table']}>
        <thead>
          <tr>
          <th>Make</th>
          <th>VIN</th>
          <th>Model</th>
          <th>Trim</th>
          <th>Price</th>
          <th></th>
          <th></th>
          </tr>
        </thead>
        <tbody>
          {
            dataGrid.map((item: IDataGrid) => {
              return(
              <tr id={item.Id}>
                <td>{item.Make}</td>
                <td>{item.VIN}</td>
                <td>{item.Model}</td>
                <td>{item.Trim}</td>
                <td>{item.Price}</td>
                <td> <EditRegular style={{cursor: 'pointer'}} onClick={() => handleEdit(item.Id)}/> </td>
                <td> <DeleteRegular style={{cursor: 'pointer'}} onClick={() => handleDelete(item.Id)} /> </td>
              </tr>
              )
            })
          }
        </tbody>           
      </table>

    </div>
    
  )
}