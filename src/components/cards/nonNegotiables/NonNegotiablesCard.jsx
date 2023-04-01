import { Text, View } from 'react-native';

import Card from '../card/Card';
import Divider from '../card/Divider';
import NonNegotiableText from './NonNegotiableText';

import { useState } from 'react';
import NonNegotiablesManager from '../../../scripts/managers/NonNegotiablesManager';

function NonNegotiablesCard( {style} ) {
    
    //#region Rerender function  
    const useForceRerendering = () => {
        const [counter, setCounter] = useState(0);
        return () => setCounter(counter => counter + 1);
    };    
  
    const forceRerendering = useForceRerendering();      
    //#endregion

    const handleTextClick = () => {
        forceRerendering();
    }

    return (
        <Card style={style}>
            <Text className="text-3xl font-semibold text-center text-headerText dark:text-headerTextDRK">Non-negotiables</Text>            
            <Divider style="mt-1.5"/>   
            
            <View className="mt-3 mb-1">                                
                {
                    NonNegotiablesManager.activeNonNegotiables.map(object => 
                        <NonNegotiableText parentOnPressActions={handleTextClick} name={object.name} key={object.name}/>
                    )
                }

                {
                    NonNegotiablesManager.completedNonNegotiables.map(object => {
                        return <NonNegotiableText parentOnPressActions={handleTextClick} name={object.name} isCompleted={true} key={object.name}/>
                    })
                }
            </View>   
        </Card>
    );
}

export default NonNegotiablesCard;