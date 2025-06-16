package com.practica.estructura.base.controller.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;


import com.practica.estructura.base.controller.dao_models.DaoCuenta;
import com.practica.estructura.base.controller.dao_models.DaoPersona;
import com.practica.estructura.base.controller.dataStruct.list.LinkedList;

import com.practica.estructura.models.Cuenta;
import com.practica.estructura.models.Persona;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;


@BrowserCallable
@AnonymousAllowed

    
public class CuentaService {

    private DaoCuenta db;
    public CuentaService() {
        db = new DaoCuenta();
    }
    public void createCuenta(@Email @NotEmpty @NotBlank String email, @NotEmpty String clave, boolean estado, Integer idPersona) throws Exception {
        if (email.trim().length() > 0 && clave.trim().length() > 0 && idPersona > 0) {
            db.getObj().setEmail(email);
            db.getObj().setClave(clave);
            db.getObj().setEstado(estado);
            db.getObj().setIdPersona(idPersona);
            

            if (!db.save()) {
                throw new Exception("Error al guardar la Cuenta");
            }
        }
    }
                
    public void updateCuenta(Integer id,@NotEmpty String clave, boolean estado, Integer idPersona) throws Exception {
        if (id != null && id > 0 && clave.trim().length() > 0 && idPersona > 0)  {
            db.setObj(db.listAll().get(id-1));
    
            db.getObj().setClave(clave);
            db.getObj().setEstado(estado);
            db.getObj().setIdPersona(idPersona);

            

            if (!db.update(id-1)) {
                throw new Exception("Error al modificar la Cuenta");
            }
        }
    }
    public List<HashMap<String, Object>> listAll() throws Exception{
        List<HashMap<String, Object>> list = new ArrayList<>();
        if (!db.listAll().isEmpty()) {
            Cuenta[] arreglo = db.listAll().toArrary();
            DaoPersona dbPersona = new DaoPersona();
            for (int i = 0; i < arreglo.length; i++) {
                HashMap<String, Object> aux = new HashMap<>();
                aux.put("id", arreglo[i].getId().toString());
                aux.put("email", arreglo[i].getEmail());
                aux.put("clave", arreglo[i].getClave());
                aux.put("estado", arreglo[i].getEstado());
                aux.put("idPersona", dbPersona.listAll().get(arreglo[i].getIdPersona()-1).getUsuario());
                list.add(aux);
        
            }

        }

        return list;
    }
   public List<HashMap> listaPersonaCombo() {
        List<HashMap> lista = new ArrayList<>();
        DaoPersona da = new DaoPersona();
        if (!da.listAll().isEmpty()) {
            Persona[] arreglo = da.listAll().toArrary();
            for (int i = 0; i < arreglo.length; i++) {
                HashMap<String, String> aux = new HashMap<>();
                aux.put("value", arreglo[i].getId().toString(i));
                aux.put("label", arreglo[i].getUsuario());
                lista.add(aux);
            }
        }
        return lista;
    }

    

    public List<Cuenta> lisAllCuenta(){
        return Arrays.asList(db.listAll().toArrary());
        
    }
    
   

    public List<HashMap<String, String>> order(String atributo, Integer type) {
        try {
            return Arrays.asList(db.orderQ(type, atributo).toArrary());
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

  

    public List<HashMap> search(String attribute, String text, Integer type) throws Exception {
        LinkedList<HashMap<String, String>> lista = db.search(attribute, text, type);
        if (!lista.isEmpty())
            return Arrays.asList(lista.toArrary());
        else
            return new ArrayList<>();
    }


 
    
}