import { Injectable, EventEmitter } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, updateDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Client from '../interfaces/client.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

    constructor(private firestore: Firestore, private afs: AngularFirestore) { }
    //private afs: AngularFirestore
    
    // Se crea colección de clientes
    addClient(client: Client) {
        const clientRef = collection(this.firestore, 'clients');
        return addDoc(clientRef, client);
    }

    // Obtenemos todos los clientes
    getClients():Observable<Client[]>  {
        const clientRef = collection(this.firestore, 'clients');
        return collectionData(clientRef, {idField: 'id'}) as Observable<Client[]>;
    }

    // Obtenemos un solo cliente
    getClient(clientId: string): Observable<any> {
        return this.afs.collection('clients').doc(clientId).snapshotChanges();
    }

    // Editar cliente
    updateClient(clientId: string, data: any): Promise<any> {
        return this.afs.collection('clients').doc(clientId).update(data);
    }
    // updateClient(client: Client) {
    //     const clientRef = doc(this.firestore, `clients/${client.id}`);
    //     return updateDoc(clientRef, {})
    // }

    //Eliminar cliente
    deleteClient(clientId: string): Promise<any> {
        return this.afs.collection('clients').doc(clientId).delete();
    }

}
