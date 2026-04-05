
import { MSGraphClientFactory, MSGraphClientV3 } from '@microsoft/sp-http';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { Fragment, useEffect, useState } from 'react';
import { ResponseType } from '@microsoft/microsoft-graph-client';
import React from 'react';

interface IMyUserProfileProps {
  msGraphClientFactory: MSGraphClientFactory; // Passed from the Web Part context
}

/**
 * Functional component to fetch the user photo, email from azure tenant by using Microsoft Graph API and render the UserProfile component
 * @param param0 
 * @returns 
 */
const UserProfile: React.FC<IMyUserProfileProps> = ({ msGraphClientFactory }) => {

  const [user, setUser] = useState<MicrosoftGraph.User | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {    
    const fetchGraphData = async () => {
      try {
        //Create MSGraphClient using version 3
        const client: MSGraphClientV3 = await msGraphClientFactory.getClient('3');

        //Fetch User profile
        const profile: MicrosoftGraph.User = await client.api('/me').get();                

        //Update the user state
        setUser(profile);

        //Fetch the user photo url
        const photoBlob: Blob = await client.api('/me/photo/$value').responseType(ResponseType.BLOB).get();
        const url = window.URL.createObjectURL(photoBlob);

        //Update the component state with photo
        setPhotoUrl(url);
      } catch(e) {
        console.error(`ERROR: ${e}`);
      }
    }

    fetchGraphData();
  }, [msGraphClientFactory]);


  return(
    <Fragment>
      <h2 style={{color:'blue'}}>Task #1</h2>
      <p>This UserProfile component is rendered by fetching the logged in user's data from Azure tenant by using <strong>Microsoft Graph API</strong></p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px' }}>
      {photoUrl ? (
        <img src={photoUrl} alt="Profile" style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
      ) : (
        <div style={{ width: '60px', height: '60px', backgroundColor: '#ccc', borderRadius: '50%' }} />
      )}
      <div>
        <h3 style={{ margin: 0 }}>User Display Name: {user?.displayName}</h3>
        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>User Email: {user?.mail}</p>
      </div>
    </div>    
    </Fragment>    
  )
}

export default UserProfile;