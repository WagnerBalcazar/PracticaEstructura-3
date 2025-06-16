package com.practica.estructura.base.controller.dao_models;

import java.util.HashMap;

import com.practica.estructura.base.controller.dao.AdapterDao;
import com.practica.estructura.base.controller.dataStruct.list.LinkedList;
import com.practica.estructura.base.controller.practica.Utiles;
import com.practica.estructura.models.Persona;

public class DaoPersona extends AdapterDao<Persona> {
    private Persona obj;
    private LinkedList<Persona> listAll;

    public DaoPersona() {
        super(Persona.class);
    }

    // Getter y Setter
    public Persona getObj() {
        if (obj == null) {
            this.obj = new Persona();
        }
        return this.obj;
    }

    public void setObj(Persona obj) {
        this.obj = obj;
    }

    // Guardar nueva persona
    public Boolean save() {
        try {
            obj.setId(listAll().getLength() + 1);
            this.persist(obj);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Actualizar persona en posición
    public Boolean update(Integer pos) {
        try {
            this.update(obj, pos);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Obtener lista de todas las personas
    public LinkedList<Persona> getlistAll() {
        if (listAll == null) {
            this.listAll = listAll(); // heredado de AdapterDao
        }
        return listAll;
    }
    
    public LinkedList<HashMap<String, String>> all() throws Exception {
        LinkedList<HashMap<String, String>> lista = new LinkedList<>();
        if (!this.listAll().isEmpty()) {
            Persona[] arreglo = this.listAll().toArrary();
            for (int i = 0; i < arreglo.length; i++) {

                lista.add(toDict(arreglo[i]));
            }
        }
        return lista;
    }

     private HashMap<String, String> toDict(Persona arreglo) throws Exception {
        
        
        HashMap<String, String> aux = new HashMap<>();
        aux.put("id", arreglo.getId().toString());
        aux.put("usuario", arreglo.getUsuario());
       
        aux.put("edad", arreglo.getEdad().toString());
        return aux;
    }


    //Metodo de ordenamiento
    // quickShort
       private int partition(Persona arr[], int begin, int end, Integer type, String attribute) {
        // hashmap //clave - valor
        // Calendar cd = Calendar.getInstance();

        Persona pivot = arr[end];
        int i = (begin - 1);
        if (type == Utiles.ASCEDENTE) {
            for (int j = begin; j < end; j++) {
                if (arr[j].getUsuario().toLowerCase().compareTo(pivot.getUsuario().toLowerCase()) < 0) {
                    // if (arr[j] <= pivot) {
                    i++;
                    Persona swapTemp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = swapTemp;
                }
            }
        } else {
            for (int j = begin; j < end; j++) {
                if (arr[j].getUsuario().toLowerCase().compareTo(pivot.getUsuario().toLowerCase()) > 0) {
                    // if (arr[j] <= pivot) {
                    i++;
                    Persona swapTemp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = swapTemp;
                }
            }
        }
        Persona swapTemp = arr[i + 1];
        arr[i + 1] = arr[end];
        arr[end] = swapTemp;

        return i + 1;
    }

    private void quickSort(Persona arr[], int begin, int end, Integer type, String attribute) {
        if (begin < end) {
            int partitionIndex = partition(arr, begin, end, type, attribute);

            quickSort(arr, begin, partitionIndex - 1, type, attribute);
            quickSort(arr, partitionIndex + 1, end, type, attribute);
        }
    }

   public LinkedList<Persona> orderQ(Integer type, String attribute) {
    LinkedList<Persona> lista = new LinkedList<>();
    if (!listAll().isEmpty()) {
        Persona arr[] = listAll().toArrary();
        quickSort(arr, 0, arr.length - 1, type, attribute);
        lista.toList(arr);
    }
    return lista;
    
}
    //metodo de busqueda
    public LinkedList<HashMap<String, String>> search(String attribute, String text, Integer type) throws Exception {
    LinkedList<HashMap<String, String>> lista = all();
    LinkedList<HashMap<String, String>> resp = new LinkedList<>();
    
    if (!lista.isEmpty()) {
        HashMap<String, String>[] arr = lista.toArrary();
        switch (type) {
            case 1:
                for (HashMap<String, String> m : arr) {
                    String value = m.get(attribute);
                    if (value != null && value.toLowerCase().startsWith(text.toLowerCase())) {
                        resp.add(m);
                    }
                }
                break;
            case 2:
                for (HashMap<String, String> m : arr) {
                    String value = m.get(attribute);
                    if (value != null && value.toLowerCase().endsWith(text.toLowerCase())) {
                        resp.add(m);
                    }
                }
                break;
            default:
                for (HashMap<String, String> m : arr) {
                    String value = m.get(attribute);
                    if (value != null && value.toLowerCase().contains(text.toLowerCase())) {
                        resp.add(m);
                    }
                }
                break;
        }
    }
    return resp;
}
}
