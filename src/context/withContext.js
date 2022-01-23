import React from "react"; 
import Context from './Context';

const withContext = (WrappedComponent)=>{
    // takes the wrapped component and then adds context...
    // to the component's props
    const withHOC = (props)=>{
        return(
            <Context.Consumer>
                {context => <WrappedComponent {...props} context={context}/>}
            </Context.Consumer>
        );
    };

    return withHOC
}

export default withContext;

// The code above means that we can follow the below pattern in the app
// import React from "react";
// import withContext from "../withContext";

// const Cart = props => {
//   // We can now access Context as props.context
// };

// export default withContext(Cart);