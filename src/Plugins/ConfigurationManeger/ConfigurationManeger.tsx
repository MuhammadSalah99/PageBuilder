import React from 'react'
import styles from './styles/ConfigurationManeger';

type ConfigManegerProps = {
    setIsOpen?: (value: boolean) => void,
    componentManeger: React.ReactNode

}

const ConfigurationManeger: React.FC<ConfigManegerProps> = ({setIsOpen, componentManeger}) => {

    
    return (
        <div>
            {componentManeger}
        </div>
    )
}

export default ConfigurationManeger;
