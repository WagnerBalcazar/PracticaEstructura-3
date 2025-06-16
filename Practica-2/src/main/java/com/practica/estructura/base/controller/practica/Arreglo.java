package com.practica.estructura.base.controller.practica;

import java.io.BufferedReader;
import java.io.FileReader;

import com.practica.estructura.base.controller.dataStruct.list.LinkedList;


public class Arreglo {

    private LinkedList<Integer> lista;

    public void cargar_data() {
       
        lista = new LinkedList<>();
        try {
            BufferedReader fb = new BufferedReader(new FileReader("Data/data.txt"));
            String line = fb.readLine();
            while (line != null) {
                lista.add(Integer.parseInt(line));
                line = fb.readLine();
            }
            fb.close();
           
        } catch (Exception e) {
            
        }
    }

    // Algoritmo Shell Sort
    
    public static void shellSort(int[] vec) {
        int N = vec.length;
        int k = N / 2;
        while (k >= 1) {
            for (int i = 0; i < k; i++) {
                for (int j = k + i; j < N; j += k) {
                    int v = vec[j];
                    int n = j - k;
                    while (n >= 0 && vec[n] > v) {
                        vec[n + k] = vec[n];
                        n -= k;
                    }
                    vec[n + k] = v;
                }
            }
            k /= 2;
        }
    }

    public void shell_sort(Integer arrayToSort[]) {
        int n = arrayToSort.length;

        for (int gap = n / 2; gap > 0; gap /= 2) {
            for (int i = gap; i < n; i++) {
                int key = arrayToSort[i];
                int j = i;
                while (j >= gap && arrayToSort[j - gap] > key) {
                    arrayToSort[j] = arrayToSort[j - gap];
                    j -= gap;
                }
                arrayToSort[j] = key;
            }
        }
    }

    public void order_shell() {
    cargar_data();
    if (!lista.isEmpty()) {
        Integer arr[] = lista.toArrary();  
        long startTime = System.currentTimeMillis();

        shell_sort(arr);

        long elapsedTime = System.currentTimeMillis() - startTime;
        System.out.println("Tiempo de ejecucion:" + elapsedTime + " milisegundos");

        lista.toList(arr);
    }
}


    // Algoritmo Quicksort
    private void quickSort(Integer arr[], int begin, int end) {
        if (begin < end) {
            int partitionIndex = partition(arr, begin, end);

            quickSort(arr, begin, partitionIndex - 1);
            quickSort(arr, partitionIndex + 1, end);
        }
    }
    private int partition(Integer arr[], int begin, int end) {
        int pivot = arr[end];
        int i = (begin - 1);

        for (int j = begin; j < end; j++) {
            if (arr[j] <= pivot) {
                i++;

                int swapTemp = arr[i];
                arr[i] = arr[j];
                arr[j] = swapTemp;
            }
        }
        int swapTemp = arr[i + 1];
        arr[i + 1] = arr[end];
        arr[end] = swapTemp;

        return i + 1;
    }
public void order_quicksort() {
    cargar_data();
    if (!lista.isEmpty()) {
        Integer arr[] = lista.toArrary();  
        long startTime = System.currentTimeMillis();

        quickSort(arr, 0, arr.length - 1);

        long elapsedTime = System.currentTimeMillis() - startTime;
        System.out.println("Tiempo de ejecucion : " + elapsedTime + " milisegundos\n");

        lista.toList(arr);
    }
}

// 
    public static void main(String[] args) {
        Arreglo w = new Arreglo();

        System.out.println("\nAlgoritmo de Quicksort");
        w.order_quicksort();
        System.out.println("Algoritmo de Shellsort");
        w.order_shell();
    }
}
