package com.practica.estructura.base.controller.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

import java.util.List;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

import jakarta.validation.constraints.NotEmpty;

import com.practica.estructura.base.controller.dao_models.DaoPersona;
import com.practica.estructura.models.Persona;
import com.practica.estructura.base.controller.dataStruct.list.LinkedList;

@BrowserCallable
@AnonymousAllowed
public class PersonaService {

    private DaoPersona db;

    public PersonaService() {
        db = new DaoPersona();
    }

    public void createPersona(@NotEmpty String usuario, Integer edad) throws Exception {
        if (usuario.trim().length() > 0 && edad != null) {
            db.getObj().setUsuario(usuario);
            db.getObj().setEdad(edad);
            if (!db.save()) {
                throw new Exception("Error al guardar la Persona");
            }
        }
    }

    public void updatePersona(Integer id, String usuario, Integer edad) throws Exception {
        if (id != null && id > 0 && usuario.trim().length() > 0 && edad != null) {
            db.setObj(db.listAll().get(id - 1));
            db.getObj().setUsuario(usuario);
            db.getObj().setEdad(edad);
            if (!db.update(id - 1)) {
                throw new Exception("Error al modificar la Persona");
            }
        }
    }

        public List<Persona> order(String atributo, Integer type) {
        try {
            return Arrays.asList(db.orderQ(type, atributo).toArrary());
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    public List<HashMap<String, String>> search(String atribute, String text, Integer type) throws Exception {
    LinkedList<HashMap<String, String>> list = db.search(atribute, text, type);
    if (!list.isEmpty()) {
        return Arrays.asList(list.toArrary());
    } else {
        return new ArrayList<>();
    }
}

    public List<Persona> lisAllPersona() {
        return Arrays.asList(db.listAll().toArrary());
    }
}
