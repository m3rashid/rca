import React from 'react'
import { Input } from "antd";
import ConfigForm from "rca/components/configForm";

interface IProps {
}

const Miscellaneous: React.FC<IProps> = () => {
    const [siteName, setSiteName] = React.useState('')
    const [siteShortName, setSiteShortName] = React.useState('')
    const [mission, setMission] = React.useState('')
    const [vision, setVision] = React.useState('')
    const [values, setValues] = React.useState('')
    const [philosophy, setPhilosophy] = React.useState('')

    const onSubmitSiteName = async () => {
        console.log(siteName)
    }

    const onSubmitSiteShortName = async () => {
        console.log(siteShortName)
    }

    const onSubmitMission = () => {
        console.log(mission)
    }

    const onSubmitVision = () => {
        console.log(vision)
    }

    const onSubmitValues = () => {
        console.log(values)
    }

    const onSubmitPhilosophy = () => {
        console.log(philosophy)
    }
    return (
        <div className='flex justify-center w-full'>
            <div className='w-1/2 my-10'>
                <ConfigForm
                    formName='siteName'
                    formLabel='Site Name'
                    formRules={[{ required: true, message: 'Please input site name' }]}
                    onSubmit={onSubmitSiteName}
                    onError={() => {
                    }}
                >
                    <Input size='large' onChange={(e) => {
                        setSiteName(e.target.value)
                    }}/>
                </ConfigForm>

                <ConfigForm
                    formName='siteShortName'
                    formLabel='Site Short Name'
                    formRules={[{ required: true, message: 'Please input short site name' }]}
                    onSubmit={onSubmitSiteShortName}
                    onError={() => {
                    }}
                >
                    <Input size='large' onChange={(e) => {
                        setSiteShortName(e.target.value)
                    }}/>
                </ConfigForm>

                <ConfigForm
                    formName='mission'
                    formLabel='Mission'
                    formRules={[{ required: true, message: 'Please input mission' }]}
                    onSubmit={onSubmitMission}
                    onError={() => {
                    }}
                >
                    <Input.TextArea size='large' onChange={(e) => {
                        setMission(e.target.value)
                    }}/>
                </ConfigForm>

                <ConfigForm
                    formName='vision'
                    formLabel='Vision'
                    formRules={[{ required: true, message: 'Please input vision' }]}
                    onSubmit={onSubmitVision}
                    onError={() => {
                    }}
                >
                    <Input.TextArea size='large' onChange={(e) => {
                        setVision(e.target.value)
                    }}/>
                </ConfigForm>

                <ConfigForm
                    formName='values'
                    formLabel='Values'
                    formRules={[{ required: true, message: 'Please input values' }]}
                    onSubmit={onSubmitValues}
                    onError={() => {
                    }}
                >
                    <Input.TextArea size='large' onChange={(e) => {
                        setValues(e.target.value)
                    }}/>
                </ConfigForm>

                <ConfigForm
                    formName='philosophy'
                    formLabel='Philosophy'
                    formRules={[{ required: true, message: 'Please input philosophy' }]}
                    onSubmit={onSubmitPhilosophy}
                    onError={() => {
                    }}
                >
                    <Input.TextArea size='large' onChange={(e) => {
                        setPhilosophy(e.target.value)
                    }}/>
                </ConfigForm>

            </div>
        </div>
    );
}

export default Miscellaneous