import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

class MenuExample {
    JMenu archivo, filtros;
    JMenuItem abrir, salir, i3, i4, i5;
    MenuExample() {
        JFrame f = new JFrame("Proceso Digital de Imágenes - Filtros");
        JMenuBar mb = new JMenuBar();
        archivo = new JMenu("Archivo");
        filtros = new JMenu("Filtros");
        abrir = new JMenuItem("Abrir Imagen");
        salir = new JMenuItem("Salir");
        i3 = new JMenuItem("Filtro 1");
        i4 = new JMenuItem("Filtro 2");
        i5 = new JMenuItem("Filtro 3");
        salir.addActionListener(new exitApp());
        archivo.add(abrir);
        archivo.add(salir);
        filtros.add(i3);
        filtros.add(i3);
        filtros.add(i4);
        mb.add(archivo);
        mb.add(filtros);
        f.setJMenuBar(mb);  
        f.setSize(1366,768);  
        f.setLayout(null);  
        f.setVisible(true);  
    }

    static class exitApp implements ActionListener {
        public void actionPerformed(ActionEvent e) {
            System.exit(0);
        }
    }

    public static void main(String args[]) {  
        new MenuExample();
    }
}
