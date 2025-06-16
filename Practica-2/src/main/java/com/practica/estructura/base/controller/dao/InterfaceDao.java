package com.practica.estructura.base.controller.dao;

import com.practica.estructura.base.controller.dataStruct.list.LinkedList;


public interface InterfaceDao <T> {

    public LinkedList<T> listAll();
        public void persist(T object) throws Exception;
        public void update(T object, Integer pos) throws Exception;
        public void update_by_id(T object, Integer id) throws Exception;
        public T get(Integer id) throws Exception;
    }
    
