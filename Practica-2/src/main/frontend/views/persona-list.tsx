import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { Button, ComboBox, DatePicker, Dialog, Grid, GridColumn, GridItemModel, GridSelectionColumn, GridSortColumn, HorizontalLayout, Icon, NumberField, PasswordField, Select, TextField, VerticalLayout } from '@vaadin/react-components';
import { Notification } from '@vaadin/react-components/Notification';

import { useSignal } from '@vaadin/hilla-react-signals';
import handleError from 'Frontend/views/_ErrorHandler';
import { Group, ViewToolbar } from 'Frontend/components/ViewToolbar';

import { useDataProvider } from '@vaadin/hilla-react-crud';
import { CuentaService, PersonaService } from 'Frontend/generated/endpoints';

import { useEffect, useState } from 'react';

import Cuenta from 'Frontend/generated/com/practica/estructura/models/Cuenta';
import Persona from 'Frontend/generated/com/practica/estructura/models/Persona';
import { order } from 'Frontend/generated/PersonaService';




export const config: ViewConfig = {
    title: 'Persona',
    menu: {
        icon: 'vaadin:clipboard-check',
        order: 2,
        title: 'Persona',
    },
};

type PersonaEntryFormProps = {
    onPersonaCreated?: () => void;
};

type PersonaEntryFormUpdateProps = {
    onPersonaUpdate: () => void;
};

function PersonaEntryForm(props: PersonaEntryFormProps) {
    const dialogOpened = useSignal(false);

    const open = () => {
        dialogOpened.value = true;
    };

    const close = () => {
        dialogOpened.value = false;
    };

    const usuario = useSignal('');
    const edad = useSignal('');

    const createPersona = async () => {
        try {
            if (usuario.value.trim().length > 0 && edad.value.trim().length > 0) {
                await PersonaService.createPersona(usuario.value, parseInt(edad.value));
                if (props.onPersonaCreated) {
                    props.onPersonaCreated();
                }
                usuario.value = '';
                edad.value = '';
                dialogOpened.value = false;
                Notification.show('Persona creada exitosamente', { duration: 5000, position: 'bottom-end', theme: 'success' });
            } else {
                Notification.show('No se pudo crear, faltan datos', { duration: 5000, position: 'top-center', theme: 'error' });
            }
        } catch (error) {
            console.log(error);
            handleError(error);
        }
    };
    return (
        <>
            <Dialog
                aria-label="Registrar Persona"
                draggable
                modeless
                opened={dialogOpened.value}
                onOpenedChanged={(event) => {
                    dialogOpened.value = event.detail.value;
                }}
                header={
                    <h2
                        className="draggable"
                        style={{
                            flex: 1,
                            cursor: 'move',
                            margin: 0,
                            fontSize: '1.5em',
                            fontWeight: 'bold',
                            padding: 'var(--lumo-space-m) 0',
                        }}
                    >
                        Registrar Persona
                    </h2>
                }
                footerRenderer={() => (
                    <>
                        <Button onClick={close}>Cancelar</Button>
                        <Button theme="primary" onClick={createPersona}>
                            Registrar
                        </Button>
                    </>
                )}
            >
                <VerticalLayout
                    theme="spacing"
                    style={{ width: '300px', maxWidth: '100%', alignItems: 'stretch' }}
                >
                    <VerticalLayout style={{ alignItems: 'stretch' }}>
                        <TextField label="Nombre"
                            placeholder='Ingrese el nombre de la Persona'
                            aria-label='Ingrese el nombre de la Persona'
                            value={usuario.value}
                            onValueChanged={(evt) => (usuario.value = evt.detail.value)}
                        />
                        <TextField label="Edad"
                            placeholder='Ingrese la edad de la Persona'
                            aria-label='Ingrese la edad de la Persona'
                            value={edad.value}
                            onValueChanged={(evt) => (edad.value = evt.detail.value)}
                        />
                    </VerticalLayout>
                </VerticalLayout>
            </Dialog>
            <Button onClick={open}>Registrar</Button>
        </>
    );
}

// PersonaEntryFormUpdate
function PersonaEntryFormUpdate(props: PersonaEntryFormUpdateProps) {
    const dialogOpened = useSignal(false);
    const open = () => {
        dialogOpened.value = true;
    }
    const close = () => {
        dialogOpened.value = false;
    }
    const usuario = useSignal(props.arguments.usuario);
    const edad = useSignal(props.arguments.edad);
    const ident = useSignal(props.arguments.ident);

    const updatePersona = async () => {
        try {
            if (usuario.value.trim().length > 0 && edad.value.trim().length > 0) {
                await PersonaService.updatePersona(ident.value, usuario.value, parseInt(edad.value));
                if (props.onPersonaUpdate) {
                    props.onPersonaUpdate();
                }
                usuario.value = '';
                edad.value = '';
                dialogOpened.value = false;
                Notification.show('Persona actualizada exitosamente', { duration: 5000, position: 'bottom-end', theme: 'success' });
            } else {
                Notification.show('No se pudo actualizar, faltan datos', { duration: 5000, position: 'top-center', theme: 'error' });
            }
        } catch (error) {
            console.log(error);
            handleError(error);
        }
    };
    return (
        <>
            <Dialog
                aria-label="Editar Persona"
                draggable
                modeless
                opened={dialogOpened.value}
                onOpenedChanged={(event) => {
                    dialogOpened.value = event.detail.value;
                }}
                header={
                    <h2
                        className="draggable"
                        style={{
                            flex: 1,
                            cursor: 'move',
                            margin: 0,
                            fontSize: '1.5em',
                            fontWeight: 'bold',
                            padding: 'var(--lumo-space-m) 0',
                        }}
                    >
                        Actualizar Persona
                    </h2>
                }
                footerRenderer={() => (
                    <>
                        <Button onClick={close}>Cancelar</Button>
                        <Button theme="primary" onClick={updatePersona}>
                            Actualizar
                        </Button>
                    </>
                )}
            >
                <VerticalLayout
                    theme="spacing"
                    style={{ width: '300px', maxWidth: '100%', alignItems: 'stretch' }}
                >
                    <VerticalLayout style={{ alignItems: 'stretch' }}>
                        <TextField label="Nombre"
                            placeholder='Ingrese el nombre de la Persona'
                            aria-label='Ingrese el nombre de la Persona'
                            value={usuario.value}
                            onValueChanged={(evt) => (usuario.value = evt.detail.value)}
                        />
                        <TextField label="Edad"
                            placeholder='Ingrese la edad de la Persona'
                            aria-label='Ingrese la edad de la Persona'
                            value={edad.value}
                            onValueChanged={(evt) => (edad.value = evt.detail.value)}
                        />
                    </VerticalLayout>
                </VerticalLayout>
            </Dialog>
            <Button onClick={open}>Editar</Button>
        </>
    );
}



function index({ model }: { model: GridItemModel<Persona> }) {
    return (
        <span>
            {model.index + 1}
        </span>
    );
}



export default function PersonaLisView() {
    const callData = () => {
        PersonaService.lisAllPersona().then(function (data) {
            setItems(data);
        });
    }

    const [items, setItems] = useState([]);
    useEffect(() => {
        callData();
    }, []);

    const order = (event, columnID) => {
        console.log(event);
        const direction = event.detail.value;

        var dir = (direction === 'asc' ? 1 : -1);
        PersonaService.order(columnID, dir).then(function (data) {
            setItems(data);
        });
        console.log("Items en vista:", items);

    }
    //para buscar
    const criterio = useSignal('');
    const texto = useSignal('');
    const itemSelect = [
        {
            label: 'Usuario',
            value: 'usuario',
        },

    ];
    const search = async () => {
        try {
            console.log(criterio.value + " " + texto.value);
            PersonaService.search(criterio.value, texto.value, 0).then(function (data) {
                setItems(data);
            });

            criterio.value = '';
            texto.value = '';

            Notification.show('Busqueda realizada', { duration: 5000, position: 'bottom-end', theme: 'success' });


        } catch (error) {
            console.log(error);
            handleError(error);
        }
    };


    function link({ item }: { item: Persona }) {
        return (
            <span>
                <PersonaEntryFormUpdate arguments={item} onPersonaUpdate={callData} />
            </span>
        );
    }



    return (
        <main className="w-full h-full flex flex-col box-border gap-s p-m">
            <ViewToolbar title="Personas">
                <Group>
                    <PersonaEntryForm onPersonaCreated={callData} />
                </Group>
            </ViewToolbar>
            <HorizontalLayout theme="spaciong">
                <Select items={itemSelect}
                    value={criterio.value}
                    onValueChanged={(evt) => (criterio.value = evt.detail.value)}
                    placeholder="Selecione un cirterio">
                </Select>
                <TextField
                    placeholder="Search"
                    style={{ width: '50%' }}
                    value={texto.value}
                    onValueChanged={(evt) => (texto.value = evt.detail.value)}
                >
                    <Icon slot="prefix" icon="vaadin:search" />
                </TextField>
                <Button onClick={search} theme="primary">
                    BUSCAR
                </Button>
            </HorizontalLayout>
            <Grid items={items}>
                <GridColumn header="Nro" renderer={index} />
                <GridSortColumn onDirectionChanged={(e) => order(e, "usuario")} path="usuario" header="Usuario" />

                <GridSortColumn onDirectionChanged={(e) => order(e, "edad")} path="edad" header="Edad" />



                <GridColumn header="Acciones" renderer={link} />
            </Grid>
        </main>
    );
}
