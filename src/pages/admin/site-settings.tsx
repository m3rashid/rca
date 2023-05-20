import React, { useEffect } from 'react';
import { Input, message } from 'antd';
import ConfigForm from 'rca/components/configForm';
import AdminContainer from "rca/components/adminContainer";
import axios from "axios";

interface IProps {
}

const Miscellaneous: React.FC<IProps> = () => {
    const [siteName, setSiteName] = React.useState('');
    const [siteShortName, setSiteShortName] = React.useState('');
    const [mission, setMission] = React.useState('');
    const [vision, setVision] = React.useState('');
    const [values, setValues] = React.useState('');
    const [philosophy, setPhilosophy] = React.useState('');

    useEffect(() => {
        const getSiteSettings = async () => {
            const response = await axios.get('/api/admin/config', {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            return response.data.data;
        }

        getSiteSettings().then(data => {

            const siteName = data.filter((item: any) => item.name === 'siteName');
            const siteShortName = data.filter(
                (item: any) => item.name === 'shortSiteName'
            );
            const mission = data.filter((item: any) => item.name === 'mission');
            const vision = data.filter((item: any) => item.name === 'vision');
            const values = data.filter((item: any) => item.name === 'values');
            const philosophy = data.filter(
                (item: any) => item.name === 'philosophy'
            );

            setSiteName(siteName[0].value);
            setSiteShortName(siteShortName[0].value);
            setMission(mission[0].value);
            setVision(vision[0].value);
            setValues(values[0].value);
            setPhilosophy(philosophy[0].value);
        });

    }, [])
    const onSubmitSiteName = async () => {
        try {
            await axios.put('/api/admin/config', {
                    name: 'siteName',
                    value: siteName,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            message.success('Site name updated successfully')
        } catch (e) {
            message.error('Site name update failed')
        }

    };

    const onSubmitSiteShortName = async () => {
        try {
            await axios.put('/api/admin/config', {
                    name: 'shortSiteName',
                    value: siteShortName,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            message.success('Site short name updated successfully')
        } catch (e) {
            message.error('Site short name update failed')
        }
    };

    const onSubmitMission = async () => {
        try {
            await axios.put('/api/admin/config', {
                    name: 'mission',
                    value: mission,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            message.info('Mission updated successfully')
        } catch (e) {
            message.error('Mission update failed')
        }
    };

    const onSubmitVision = async () => {
        try {
            await axios.put('/api/admin/config', {
                    name: 'vision',
                    value: vision,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            message.success('Vision updated successfully')
        } catch (e) {
            message.error('Vision update failed')
        }
    };

    const onSubmitValues = async () => {
        try {
            await axios.put('/api/admin/config', {
                    name: 'values',
                    value: values,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            message.success('Values updated successfully')
        } catch (e) {
            message.error('Values update failed')
        }
    };

    const onSubmitPhilosophy = () => {
        try {
            axios.put('/api/admin/config', {
                    name: 'philosophy',
                    value: philosophy,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            message.success('Philosophy updated successfully')
        } catch (e) {
            message.error('Philosophy update failed')
        }
    };
    return (
        <AdminContainer>
            <div className='flex justify-center w-full'>
                <div className='w-1/2 my-10'>
                    <ConfigForm
                        formName='siteName'
                        formLabel='Site Name'
                        formRules={[{ required: true, message: 'Please input site name' }]}
                        formInitialValue={siteName}
                        onSubmit={onSubmitSiteName}
                        onError={() => {
                        }}
                    >
                        <Input
                            size='large'
                            onChange={(e) => {
                                setSiteName(e.target.value);
                            }}
                        />
                    </ConfigForm>

                    <ConfigForm
                        formName='siteShortName'
                        formLabel='Site Short Name'
                        formRules={[
                            { required: true, message: 'Please input short site name' },
                        ]}
                        formInitialValue={siteShortName}
                        onSubmit={onSubmitSiteShortName}
                        onError={() => {
                        }}
                    >
                        <Input
                            size='large'
                            onChange={(e) => {
                                setSiteShortName(e.target.value);
                            }}
                        />
                    </ConfigForm>

                    <ConfigForm
                        formName='mission'
                        formLabel='Mission'
                        formRules={[{ required: true, message: 'Please input mission' }]}
                        formInitialValue={mission}
                        onSubmit={onSubmitMission}
                        onError={() => {
                        }}
                    >
                        <Input.TextArea
                            size='large'
                            onChange={(e) => {
                                setMission(e.target.value);
                            }}
                        />
                    </ConfigForm>

                    <ConfigForm
                        formName='vision'
                        formLabel='Vision'
                        formRules={[{ required: true, message: 'Please input vision' }]}
                        formInitialValue={vision}
                        onSubmit={onSubmitVision}
                        onError={() => {
                        }}
                    >
                        <Input.TextArea
                            size='large'
                            onChange={(e) => {
                                setVision(e.target.value);
                            }}
                        />
                    </ConfigForm>

                    <ConfigForm
                        formName='values'
                        formLabel='Values'
                        formRules={[{ required: true, message: 'Please input values' }]}
                        formInitialValue={values}
                        onSubmit={onSubmitValues}
                        onError={() => {
                        }}
                    >
                        <Input.TextArea
                            size='large'
                            onChange={(e) => {
                                setValues(e.target.value);
                            }}
                        />
                    </ConfigForm>

                    <ConfigForm
                        formName='philosophy'
                        formLabel='Philosophy'
                        formRules={[{ required: true, message: 'Please input philosophy' }]}
                        formInitialValue={philosophy}
                        onSubmit={onSubmitPhilosophy}
                        onError={() => {
                        }}
                    >
                        <Input.TextArea
                            size='large'
                            onChange={(e) => {
                                setPhilosophy(e.target.value);
                            }}
                        />
                    </ConfigForm>
                </div>
            </div>
        </AdminContainer>
    );
};

export default Miscellaneous;
