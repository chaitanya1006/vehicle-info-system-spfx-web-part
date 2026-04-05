import * as React from 'react';
import styles from './HelloWorld.module.scss';
import type { IVehiclePageInfo } from './IHelloWorldProps';
import VehicleComponent from './VehicleComponent';
import UserProfile from './UserProfile';
import GetDetailsFromAzureFunctionComponent from './GetDetailsFromAzureFunctionComponent';


export default class HelloWorld extends React.Component<IVehiclePageInfo> {

  constructor(props: IVehiclePageInfo | Readonly<IVehiclePageInfo>) {
    super(props);
  }

  public render(): React.ReactElement<IVehiclePageInfo> { 
    return (
      <section className={`${styles.helloWorld}}`}>        
        <div>                    
          <UserProfile {...this.props}/>
                  
          <hr/>
          <VehicleComponent {...this.props}/>

          <hr/>
          <GetDetailsFromAzureFunctionComponent {...this.props}/>  
        </div>
      </section>
    );
  }
}
