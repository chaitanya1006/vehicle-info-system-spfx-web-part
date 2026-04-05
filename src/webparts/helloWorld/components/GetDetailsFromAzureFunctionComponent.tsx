import React, { Fragment, useEffect, useState } from "react";
import { AadHttpClient, AadHttpClientFactory, AadTokenProviderFactory, HttpClientResponse } from '@microsoft/sp-http';
import styles from './HelloWorld.module.scss';

interface IaadHttpClientFactory {
  aadHttpClientFactory: AadHttpClientFactory;  
}

interface IAzureFunctionResult {
  id: number;
  vehicle: string;
  lastService: string;
  nextService: string;
  status: string
}

/**
 * React functional component to fetch the data from the Azure function and render the result in a HTML table.
 * @param param0 
 * @returns 
 */
const GetDetailsFromAzureFunctionComponent: React.FC<IaadHttpClientFactory> = ({ aadHttpClientFactory }) => {
  
  const initialData: IAzureFunctionResult[] = [];
  const [dataFromAzureFunction, setDataFromAzureFunction] = useState(initialData);
  
  /**
   * Function to fetch the data from the azure function exposed through an API. 
   * The Azure function is protected by Microsoft Entra ID
   * @returns 
   */
  const fetchDetailsFromAzureFunction = async () => {
    let resultJson: IAzureFunctionResult[] = [];    
        
    //Function Endpoint
    const functionUrl = `${process.env.SPFX_AZURE_FUNCTION_BASE_URL}/${process.env.SPFX_AZURE_FUNCTION_ENDPOINT}`;                                    

    //Function App Id URI
    const functionAppIdUri = `api://${process.env.SPFX_AZURE_FUNCTION_APP_CLIENT_ID}`;

    //Function Key
    const functionKey: string = process.env.SPFX_AZURE_FUNCTION_KEY as string;

    const requestHeaders: Headers = new Headers();
    requestHeaders.append('x-functions-key', functionKey);

    try {
      // Get the AadHttpClient for the specific resource
      const aadHttpClient: AadHttpClient = await aadHttpClientFactory.getClient(functionAppIdUri);
                
      // Call the specific endpoint
      const response: HttpClientResponse = await aadHttpClient.get(
        functionUrl, 
        AadHttpClient.configurations.v1, 
        {
          headers: requestHeaders
        }
      );
      
      if(response.ok) {
        resultJson = await response.json();
      } else {
        throw new Error(response.statusText);
      }
    } catch(error) {
      if (error instanceof Error) {        
        console.error(error.message);
      } else {        
        console.error("An unexpected error occurred", error);
      }
    }
    return resultJson;     
  }
  
  //The useEffect hook will be called once the component is rendered
  useEffect(() => {
    const exe = async () => {
      const result: IAzureFunctionResult[] = await fetchDetailsFromAzureFunction();
      setDataFromAzureFunction(result);
    }
    exe();
  }, []);

  return(
    <div style={{paddingTop:'30px'}}>
      <h2 style={{color:'blue'}}>Task #3</h2>
      <p>The below HTML table is rendered by accessing the data from Azure Function. The function endpoint is exposed as a REST API GET endpoint and will be invoked by HTTP trigger.  <br></br><br></br>
      <strong>The Azure Function is protected by Entra ID</strong>. <br></br><br></br>
      This component will act <strong>on-behalf of the logged in user</strong> and access the Azure Function.</p> <br></br>
    
      <table className={styles['vehicle-table']}>
        <thead>
          <tr>
          <th>ID</th>
          <th>Vehicle</th>
          <th>Last Service</th>
          <th>Next Service</th>
          <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            dataFromAzureFunction.map((item: IAzureFunctionResult) => {
              return(
              <tr>
                <td>{item.id}</td>
                <td>{item.vehicle}</td>
                <td>{item.lastService}</td>
                <td>{item.nextService}</td>
                <td>{item.status}</td>              
              </tr>
              )
            })
          }
        </tbody>           
      </table>
    </div>
  )
}

export default GetDetailsFromAzureFunctionComponent;