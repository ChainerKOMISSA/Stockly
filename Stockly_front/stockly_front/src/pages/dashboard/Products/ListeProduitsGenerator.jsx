import React, { useState, useEffect } from 'react'
import { Document, Page, Text, View, Font, StyleSheet } from '@react-pdf/renderer';
import boutiqueData from '../../../helpers/parametresBoutique.json';
import { API_URL } from '../../../components/constantes'
import { formatDate } from '../../../helpers/DateFormat';


const ListeProduitsGenerator = () => {
    const [produits, setProduits] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/produits`)
            .then(response => response.json())
            .then(data => {
                setProduits(data)
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des produits: ', error)
            })
    }, []);
    const MyDocument = (
        <Document title='Liste des produits'>
            <Page orientation='portrait' size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>{boutiqueData.nomBoutique}</Text>
                    <Text>{'\n'}</Text>
                    <View style={styles.subtitles}>
                        <Text style={styles.subtitle}>{boutiqueData.adresseBoutique}</Text>
                        <Text>{'\n'}</Text>
                        <Text style={styles.subtitle}>{boutiqueData.contactBoutique}</Text>
                        <Text>{'\n'}</Text>
                    </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Liste des produits</Text>
                    {/* Tableau avec 6 colonnes */}
                    <View style={styles.table}>
                        {/* En-têtes de colonnes */}
                        <View style={styles.tableRow}>
                            <Text style={styles.tableHeader}>#</Text>
                            <Text style={styles.tableHeader}>Catégorie du produit</Text>
                            <Text style={styles.tableHeader}>Nom du produit</Text>
                            <Text style={styles.tableHeader}>Prix</Text>
                            <Text style={styles.tableHeader}>Quantité en stock</Text>
                            <Text style={styles.tableHeader}>Date de péremption</Text>
                        </View>
                        {/* Données du tableau */}
                        {produits.map((produit, index) => (
                            <View style={styles.tableRow} key={index}>
                                <Text style={styles.tableCell}>{index + 1}</Text>
                                <Text style={styles.tableCell}>{produit.Categorie.libelle}</Text>
                                <Text style={styles.tableCell}>{produit.nom}</Text>
                                <Text style={styles.tableCell}>{produit.prix}</Text>
                                <Text style={styles.tableCell}>{produit.quantiteStock}</Text>
                                <Text style={styles.tableCell}>{formatDate(produit.datePeremption)}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </Page>
        </Document>

    );

    return MyDocument;
}

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});


const styles = StyleSheet.create({
    page : {
        padding : 40
    },
    header: {
        textAlign: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitles: {
        flexDirection: 'column',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 12,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginBottom: 20,
    },
    section: {
        textAlign: 'center',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    table: {
        display: 'table',
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 20,
    },
    tableRow: {
        flexDirection: 'row',
        display: 'table-row',
        backgroundColor: '#f2f2f2',
    },
    tableHeader: {
        fontWeight: 'bold',
        display: 'table-cell',
        padding: 8,
        textAlign : 'center',
        borderWidth: 1,
        borderColor: 'black',
    },
    tableCell: {
        display: 'table-cell',
        textAlign : 'center',
        padding: 8,
        borderWidth: 1,
        borderColor: 'black',
    },
});


export default ListeProduitsGenerator