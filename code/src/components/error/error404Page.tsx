import * as React from 'react';

interface Props extends React.Props<Error404> {
}

// Nice tsx guide: https://github.com/Microsoft/TypeScript/wiki/JSX
export default class Error404 extends React.Component<Props, {}> {
   public render() {
       return (
            <div style={{height:"300px", backgroundColor:"#FFFFFF"}}>
                <div style={{paddingTop:"9.5%", paddingBottom:"9.5%", marginLeft:"35%", fontSize:"44px", fontWeight: "bolder"}}>Page not found</div>
            </div>
       );
  }
}
