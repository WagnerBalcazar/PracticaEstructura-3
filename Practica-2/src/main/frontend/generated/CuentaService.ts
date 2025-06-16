import { EndpointRequestInit as EndpointRequestInit_1 } from "@vaadin/hilla-frontend";
import type Cuenta_1 from "./com/practica/estructura/models/Cuenta.js";
import client_1 from "./connect-client.default.js";
async function createCuenta_1(email: string | undefined, clave: string | undefined, estado: boolean, idPersona: number | undefined, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("CuentaService", "createCuenta", { email, clave, estado, idPersona }, init); }
async function lisAllCuenta_1(init?: EndpointRequestInit_1): Promise<Array<Cuenta_1 | undefined> | undefined> { return client_1.call("CuentaService", "lisAllCuenta", {}, init); }
async function listAll_1(init?: EndpointRequestInit_1): Promise<Array<Record<string, unknown> | undefined> | undefined> { return client_1.call("CuentaService", "listAll", {}, init); }
async function listaPersonaCombo_1(init?: EndpointRequestInit_1): Promise<Array<Record<string, unknown> | undefined> | undefined> { return client_1.call("CuentaService", "listaPersonaCombo", {}, init); }
async function order_1(atributo: string | undefined, type: number | undefined, init?: EndpointRequestInit_1): Promise<Array<Record<string, string | undefined> | undefined> | undefined> { return client_1.call("CuentaService", "order", { atributo, type }, init); }
async function search_1(attribute: string | undefined, text: string | undefined, type: number | undefined, init?: EndpointRequestInit_1): Promise<Array<Record<string, unknown> | undefined> | undefined> { return client_1.call("CuentaService", "search", { attribute, text, type }, init); }
async function updateCuenta_1(id: number | undefined, clave: string | undefined, estado: boolean, idPersona: number | undefined, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("CuentaService", "updateCuenta", { id, clave, estado, idPersona }, init); }
export { createCuenta_1 as createCuenta, lisAllCuenta_1 as lisAllCuenta, listAll_1 as listAll, listaPersonaCombo_1 as listaPersonaCombo, order_1 as order, search_1 as search, updateCuenta_1 as updateCuenta };
