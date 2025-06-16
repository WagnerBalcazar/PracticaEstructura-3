import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { Button, ComboBox, DatePicker, Dialog, Grid, GridColumn, GridItemModel, GridSortColumn, HorizontalLayout, Icon, NumberField, PasswordField, Select, TextField, VerticalLayout } from '@vaadin/react-components';
import { Notification } from '@vaadin/react-components/Notification';

import { useSignal } from '@vaadin/hilla-react-signals';
import handleError from 'Frontend/views/_ErrorHandler';
import { Group, ViewToolbar } from 'Frontend/components/ViewToolbar';

import { useDataProvider } from '@vaadin/hilla-react-crud';
import { CuentaService, PersonaService } from 'Frontend/generated/endpoints';

import { useEffect, useState } from 'react';

import Cuenta from 'Frontend/generated/com/practica/estructura/models/Cuenta';
import Persona from 'Frontend/generated/com/practica/estructura/models/Persona';



export const config: ViewConfig = {
  title: 'Cuenta',
  menu: {
    icon: 'vaadin:clipboard-check',
    order: 3,
    title: 'Cuenta',
  },
};

type CuentaEntryFormProps = {
  onCuentaCreated?: () => void;
};
type CuentaEntryFormUpdateProps = {
  onCuentaUpdate: () => void;
};

function CuentaEntryForm(props: CuentaEntryFormProps) {
  const dialogOpened = useSignal(false);
  const [personas, setPersonas] = useState<Persona[]>([]);



  const open = () => {
    dialogOpened.value = true;
  };

  const close = () => {
    dialogOpened.value = false;
  };

  const email = useSignal('');
  const clave = useSignal('');
  const estado = useSignal('');
  const idPersona = useSignal('');


  const createCuenta = async () => {
    try {
      if (email.value.trim().length > 0 && clave.value.trim().length > 0 && estado.value.trim().length > 0 && idPersona.value.trim().length > 0) {
        const idPersonvalue = parseInt(idPersona.value) + 1;
        await CuentaService.createCuenta(email.value, clave.value, estado.value === 'true', idPersonvalue);



        if (props.onCuentaCreated) {
          props.onCuentaCreated();
        }
        email.value = '';
        clave.value = '';
        estado.value = '';
        idPersona.value = '';
        dialogOpened.value = false;
        Notification.show('Cuenta creada exitosamente', { duration: 5000, position: 'bottom-end', theme: 'success' });
      } else {
        Notification.show('No se pudo crear, faltan datos', { duration: 5000, position: 'top-center', theme: 'error' });
      }
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };
  useEffect(() => {
    CuentaService.listaPersonaCombo()
      .then((result) => setPersonas(result))
      .catch(console.error);
  }, []);




  return (
    <>
      <Dialog
        aria-label="Registrar Cuenta"
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
            Registrar Cuenta
          </h2>
        }
        footerRenderer={() => (
          <>
            <Button onClick={close}>Cancelar</Button>
            <Button theme="primary" onClick={createCuenta}>
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
            <TextField label="email"
              placeholder='Ingrese el email de la Cuenta'
              aria-label='Ingrese el email de la Cuenta'
              value={email.value}
              onValueChanged={(evt) => (email.value = evt.detail.value)}
            />
            <PasswordField
              label="Clave"
              placeholder="Ingrese la clave de la Cuenta"
              aria-label="Ingrese la clave de la Cuenta"
              value={clave.value}
              onValueChanged={(evt) => (clave.value = evt.detail.value)}
              errorMessage="La contraseña debe tener al menos 6 caracteres"
              invalid={clave.value.length > 0 && clave.value.length < 6}
            />

            <ComboBox
              label="Estado"
              placeholder="Seleccione el estado de la Cuenta"
              items={[
                { label: 'Activo', value: 'true' },
                { label: 'Inactivo', value: 'false' }
              ]}
              itemLabelPath="label"
              itemValuePath="value"
              value={estado.value}
              onValueChanged={(e) => (estado.value = e.detail.value)}
            />
            <ComboBox
              label="Personas"
              items={personas}
              value={idPersona.value}
              onValueChanged={(e) => (idPersona.value = e.detail.value)}
              placeholder="Seleccione la Persona"
            />


          </VerticalLayout>
        </VerticalLayout>
      </Dialog>
      <Button onClick={open}>Registrar</Button>

    </>
  );
}

// CuentaEntryFormUpdate

function CuentaEntryFormUpdate(props: CuentaEntryFormUpdateProps) {
  const dialogOpened = useSignal(false);
  const [personas, setPersonas] = useState<String[]>([]);

  const open = () => {
    dialogOpened.value = true;
  };

  const close = () => {
    dialogOpened.value = false;
  };

  const clave = useSignal(props.arguments.clave);
  const estado = useSignal(props.arguments.estado);
  const ident = useSignal(props.arguments.id);
  const idPersona = useSignal(props.arguments.idPersona);


  const updateCuenta = async () => {
    try {
      if (clave.value.trim().length > 0 && estado.value.trim().length > 0) {
        const idPersonavalue = parseInt(idPersona.value) + 1;

        await CuentaService.updateCuenta(parseInt(ident.value), clave.value, estado.value === 'true', idPersonavalue);
        if (props.onCuentaUpdate) {
          props.onCuentaUpdate();
        }
        clave.value = '';
        estado.value = '';
        idPersona.value = '';
        dialogOpened.value = false;

        Notification.show('Cuenta actualizada exitosamente', { duration: 5000, position: 'bottom-end', theme: 'success' });
      } else {
        Notification.show('No se pudo actualizar, faltan datos', { duration: 5000, position: 'top-center', theme: 'error' });
      }
    } catch (error) {
      console.log(error);
      handleError(error);

    }


  };
  useEffect(() => {
    CuentaService.listaPersonaCombo()
      .then((result) => setPersonas(result))
      .catch(console.error);
  }, []);
  return (
    <>
      <Dialog
        aria-label="Actualizar Cuenta"
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
            Actualizar Cuenta
          </h2>
        }
        footerRenderer={() => (
          <>
            <Button onClick={close}>Cancelar</Button>
            <Button theme="primary" onClick={updateCuenta}>
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

            <PasswordField
              label="Clave"
              placeholder="Ingrese la clave de la Cuenta"
              aria-label="Ingrese la clave de la Cuenta"
              value={clave.value}
              onValueChanged={(evt) => (clave.value = evt.detail.value)}
              errorMessage="La contraseña debe tener al menos 6 caracteres"
              invalid={clave.value.length > 0 && clave.value.length < 6}
            />

            <ComboBox
              label="Estado"
              placeholder="Seleccione el estado de la Cuenta"
              items={[
                { label: 'Activo', value: 'true' },
                { label: 'Inactivo', value: 'false' }
              ]}
              itemLabelPath="label"
              itemValuePath="value"
              value={estado.value}
              onValueChanged={(e) => (estado.value = e.detail.value)}
            />
            <ComboBox
              label="Personas"
              items={personas}
              value={idPersona.value}
              onValueChanged={(e) => (idPersona.value = e.detail.value)}
              placeholder="Seleccione el tipo de archivo"
            />
          </VerticalLayout>
        </VerticalLayout>
      </Dialog>
      <Button onClick={open}>Editar</Button>
    </>
  );
}






function index({ model }: { model: GridItemModel<Cuenta> }) {
  return (
    <span>
      {model.index + 1}
    </span>
  );
}





export default function CuentaLisView() {
  const callData = () => {
    CuentaService.listAll().then(function (data) {
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
    CuentaService.order(columnID, dir).then(function (data) {
      setItems(data);
    });
    console.log("Items en vista:", items);

  }
  const criterio = useSignal('');
  const texto = useSignal('');


  const itemSelect = [
    {
      label: 'Email',
      value: 'email'
    },

    {
      label: 'Usuario',
      value: 'idPersona'
    }
  ]
  const search = async () => {
    try {
      console.log(criterio.value + " " + texto.value);
      CuentaService.search(criterio.value, texto.value, 0).then(function (data) {
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

  function link({ item }: { item: Cuenta }) {
    return (
      <span>
        <CuentaEntryFormUpdate arguments={item} onCuentaUpdate={callData} />
      </span>
    );
  }

  return (
    <main className="w-full h-full flex flex-col box-border gap-s p-m">
      <ViewToolbar title="Cuentas">
        <Group>
          <CuentaEntryForm onCuentaCreated={callData} />
        </Group>
      </ViewToolbar>
      <HorizontalLayout theme="spacing">
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
        <GridSortColumn onDirectionChanged={(e) => order(e, "email")} path="email" header="email" />

        <GridSortColumn onDirectionChanged={(e) => order(e, "idPersona")} path="idPersona" header=" Usuario" />
        <GridColumn
          header="Clave"
          renderer={({ item }) => <span>{'*'.repeat(item.clave.length)}</span>}
        />
        <GridColumn
          header="Estado"
          renderer={({ item }) => (
            <span style={{ color: item.estado ? 'blue' : 'red', fontWeight: 'bold' }}>
              {item.estado ? 'Activo' : 'Inactivo'}
            </span>
          )}
        />

        <GridColumn header="Acciones" renderer={link} />
      </Grid>
    </main>
  );
}
