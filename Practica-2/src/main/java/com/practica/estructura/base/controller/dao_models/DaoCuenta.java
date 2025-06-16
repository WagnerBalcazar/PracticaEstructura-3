package com.practica.estructura.base.controller.dao_models;

import java.util.HashMap;

import com.practica.estructura.base.controller.dao.AdapterDao;
import com.practica.estructura.base.controller.dataStruct.list.LinkedList;
import com.practica.estructura.base.controller.practica.Utiles;
import com.practica.estructura.models.Cuenta;
import com.practica.estructura.models.Persona;

public class DaoCuenta extends AdapterDao<Cuenta> {
    private Cuenta obj;
    private LinkedList<Cuenta> listAll;

    public DaoCuenta() {
        super(Cuenta.class);
        // TODO Auto-generated constructor stub
    }

    // getter and setter
    public Cuenta getObj() {
        if (obj == null) {
            this.obj = new Cuenta();

        }
        return this.obj;
    }

    public void setObj(Cuenta obj) {
        this.obj = obj;
    }

    public Boolean save() {
        obj.setId(listAll().getLength() + 1);
        try {
            this.persist(obj);
            return true;
        } catch (Exception e) {

            return false;
            // TODO: handle exception
        }
    }

    public Boolean update(Integer pos) {
        try {
            this.update(obj, pos);
            return true;
        } catch (Exception e) {

            return false;
            // TODO: handle exception
        }
    }

    public LinkedList<HashMap<String, String>> all() throws Exception {
        LinkedList<HashMap<String, String>> lista = new LinkedList<>();
        if (!this.listAll().isEmpty()) {
            Cuenta[] arreglo = this.listAll().toArrary();
            for (int i = 0; i < arreglo.length; i++) {
                lista.add(toDic(arreglo[i]));

            }
        }
        return lista;

    }

    public HashMap<String, String> toDic(Cuenta arreglo) throws Exception {
        DaoPersona da = new DaoPersona();
        HashMap<String, String> aux = new HashMap<>();
        
        aux.put("id", arreglo.getId().toString());
        aux.put("email", arreglo.getEmail());
        aux.put("clave", arreglo.getClave());
        aux.put("estado", arreglo.getEstado() ? "Activo" : "Inactivo");
        aux.put("idPersona", da.listAll().get(arreglo.getIdPersona() - 1).getUsuario());

        return aux;
    }

    public LinkedList<Cuenta> getListAll() {
        if (listAll == null) {
            listAll = listAll();
        }
        return listAll;
    }

    // Metodo de ordenamiento
    // quickShort
      /**
     * metodo q llama a quicksort 
     * @param arr
     * @param begin
     * @param end
     * @param type
     * @param attribute
     * @return
     */

    public LinkedList<HashMap<String, String>> orderQ(Integer type, String attribute) throws Exception {
        LinkedList<HashMap<String, String>> lista = new LinkedList<>();
        
        if (!all().isEmpty()) {

           HashMap<String, String> arr[] = all().toArrary();
            quickSort(arr, 0, arr.length - 1, type, attribute);
            lista.toList(arr);
            }
             return lista;
        }

     /**
     * metodo q deja hacer la particion 
     * @param arr
     * @param begin
     * @param end
     * @param type
     * @param attribute
     * @return
     */

    private void quickSort(HashMap<String, String> arr[], int begin, int end, Integer type, String attribute) {
        if (begin < end) {
            int partitionIndex = partition(arr, begin, end, type, attribute);

            quickSort(arr, begin, partitionIndex - 1, type, attribute);
            quickSort(arr, partitionIndex + 1, end, type, attribute);
        }
    }
       

    /**
     * metodo q deja hacer la particion 
     * @param arr
     * @param begin
     * @param end
     * @param type
     * @param attribute
     * @return
     */
   
    private int partition(HashMap<String, String> arr[], int begin, int end, Integer type, String attribute) {
        HashMap<String, String> pivot = arr[end];
        int i = (begin - 1);
        
        if (type == Utiles.ASCEDENTE) {
            for (int j = begin; j < end; j++) {
                if (arr[j].get(attribute).toString().toLowerCase().compareTo(pivot.get(attribute).toString().toLowerCase()) < 0) {
                    // if (arr[j] <= pivot) {
                    i++;
                    HashMap<String, String> swapTemp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = swapTemp;
                }
            }
        } else {
            for (int j = begin; j < end; j++) {
                if (arr[j].get(attribute).toString().toLowerCase().compareTo(pivot.get(attribute).toString().toLowerCase()) > 0) {
                    // if (arr[j] <= pivot) {
                    i++;
                    HashMap<String, String> swapTemp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = swapTemp;
                }
            }
        }
        HashMap<String, String> swapTemp = arr[i + 1];
        arr[i + 1] = arr[end];
        arr[end] = swapTemp;

        return i + 1;
    }
   
  
    

    // metodo de busqueda

    public LinkedList<HashMap<String, String>> search(String attribute, String text, Integer type) throws Exception {
        LinkedList<HashMap<String, String>> lista = all();
        LinkedList<HashMap<String, String>> resp = new LinkedList<>();

        if (!lista.isEmpty()) {
            // ordenamos la lista
            lista = orderQ(Utiles.ASCEDENTE, attribute);
            // convertimos la lista a un array
            HashMap<String, String>[] arr = lista.toArrary();
            Integer n = bynaryLineal(arr, attribute, text);
            System.out.println("n de mitad " + n);
            switch (type) {
                case 1:

                if (n > 0) {
                    for (int i = n; i < arr.length; i++) {
                        if (arr[i].get(attribute).toString().trim().toLowerCase().startsWith(text.toLowerCase())) {
                            resp.add(arr[i]);
                        }
                    }
                } else if (n < 0) {
                    for (int i = 0; i < arr.length; i++) {
                        if (arr[i].get(attribute).toString().toLowerCase().startsWith(text.toLowerCase())) {
                            resp.add(arr[i]);
                        }
                    }
                }else {
                    for (int i = 0; i < arr.length; i++) {
                        if (arr[i].get(attribute).toString().toLowerCase().startsWith(text.toLowerCase())) {
                            resp.add(arr[i]);
                        }
                    }
                }
                    break;

                case 2:
                if (n > 0) {
                    for (int i = n; i < arr.length; i++) {
                        if (arr[i].get(attribute).toString().toLowerCase().endsWith(text.toLowerCase())) {
                            resp.add(arr[i]);
                        }
                    }
                } else if (n < 0) {

                    n *= -1;
                    for (int i = 0; i < n; i++) {
                        if (arr[i].get(attribute).toString().toLowerCase().endsWith(text.toLowerCase())) {
                            resp.add(arr[i]);
                        }
                    }
            }else  { 
                for (int i = 0; i < arr.length; i++) {
                        if (arr[i].get(attribute).toString().toLowerCase().endsWith(text.toLowerCase())) {
                            resp.add(arr[i]);
                        }
                    }
                }
                break;
                default:
                System.out.println(attribute + " " + text + "TRES" + n);


                    for (int i = 0; i < arr.length; i++) {
                        if (arr[i].get(attribute).toString().toLowerCase().contains(text.toLowerCase())) {
                            resp.add(arr[i]);
                        }
                    }
                    break;
            }

           
        }
       return resp;
    }
     

    // lineal binaria
     /**
      * 
      * @param array
      * @param attribute
      * @param text
      * @return
      */

    private Integer bynaryLineal(HashMap<String, String>[] array, String attribute, String text) {
        Integer half = 0;
        if (!(array.length == 0) && !text.isEmpty()) {
            half = array.length / 2;
            int aux = 0;
            
            if (text.trim().toLowerCase().charAt(0) > array[half].get(attribute).toString().trim().toLowerCase().charAt(0))
    
                aux = 1;
             else if (text.trim().toLowerCase().charAt(0) < array[half].get(attribute).toString().trim().toLowerCase().charAt(0))
                aux = -1;

                half = half * aux;
        }


        return half;
    }

}