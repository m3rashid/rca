import React, { useEffect } from 'react';
import { Input, message } from 'antd';
import ConfigForm from 'rca/components/configForm';
import AdminContainer from "rca/components/adminContainer";
import axios from "axios";

interface IProps {
}

interface IConfig {
    name: string;
    value: string;
    label: string;
}

const Miscellaneous: React.FC<IProps> = () => {
    const [config, setConfig] = React.useState<IConfig[]>([]);

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
            setConfig(
                data.map((item: any) => {
                    return {
                        name: item.name,
                        value: item.value,
                        label: splitCamelCase(item.name),
                    };
                })
            );
        });

    }, []);

    const splitCamelCase = (str: string) => {
        const result = str.replace(/([A-Z])/g, " $1");
        return result.charAt(0).toUpperCase() + result.slice(1);
    }

    const onSubmitConfig = async ({ name, value }: IConfig) => {
        try {
            await axios.put('/api/admin/config', {
                    name: name,
                    value: value,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            message.success('Config updated successfully')
        } catch (e) {
            message.error('Config update failed')
        }
    }
    return (
        <AdminContainer>
            <div className='flex justify-center w-full'>
                <div className='w-1/2 my-10'>
                    {config.map((item, index) => {
                        return (
                            <ConfigForm
                                key={index}
                                formName={item.name}
                                formLabel={item.label}
                                formRules={[{ required: true, message: `Please input ${item.label}` }]}
                                formInitialValue={item.value}
                                onSubmit={() => {
                                    onSubmitConfig(item).then();
                                }}
                                onError={() => {
                                }}
                            >
                                <Input.TextArea
                                    size='large'
                                    onChange={(e) => {
                                        setConfig([...config.slice(0, index), {
                                            ...item,
                                            value: e.target.value,
                                        }, ...config.slice(index + 1)]);
                                    }}
                                    rows={4}
                                />
                            </ConfigForm>
                        )
                    })
                    }
                </div>
            </div>
        </AdminContainer>
    );
};

export default Miscellaneous;
