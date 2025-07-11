import React, { useState, useEffect } from 'react'
import { API_URL } from '../../../components/constantes';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

const ReceiptRenderer = ({ listeproduits, nomvendeur, datevente }) => {
    const [boutiqueData, setBoutiqueData] = useState({});

    // Calcul du total
    const total = listeproduits.reduce((acc, item) => acc + item.prix * item.quantite, 0);
    const discount = 0;
    const totalTTC = total - discount;

    useEffect(() => {
        fetch(`${API_URL}/boutique`)
            .then(response => response.json())
            .then(data => {
                setBoutiqueData(data)
            })
            .catch(error => {
                console.error("Erreur de chargement des données :", error)
            });
    }, []);


    return (
        <Document>
            <Page style={styles.page}>
                {/* En-tête */}
                <Text style={styles.header}>{boutiqueData.nomBoutique}</Text>
                <Text style={styles.subHeader}>Des produits de qualité à des prix réduits!</Text>

                {/* Informations Client */}
                <View style={styles.clientInfo}>
                    <View style={styles.clientInfoRow}>
                        <Text>Client :</Text>
                        <Text>Date : {datevente}</Text>
                    </View>
                    <View style={styles.clientInfoRow}>
                        <Text>Adresse : {boutiqueData.adresseBoutique}</Text>
                        <Text>Téléphone : {boutiqueData.contactBoutique}</Text>
                    </View>
                    <View style={styles.clientInfoRow}>
                        <Text>Ville : {boutiqueData.ville}</Text>
                        <Text>Code Postal : {boutiqueData.codePostal}</Text>
                    </View>
                </View>

                {/* Tableau des produits */}
                <View style={styles.tableContainer}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableHeaderText}>Quantité</Text>
                        <Text style={styles.tableHeaderText}>Produit</Text>
                        <Text style={styles.tableHeaderText}>Prix unitaire</Text>
                        <Text style={styles.tableHeaderText}>Total</Text>
                    </View>
                    {listeproduits.map((produit, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{produit.quantite}</Text>
                            <Text style={styles.tableCell}>{produit.nom}</Text>
                            <Text style={styles.tableCell}>{produit.prix} {boutiqueData.monnaie}</Text>
                            <Text style={styles.tableCell}>{produit.prix * produit.quantite} {boutiqueData.monnaie}</Text>
                        </View>
                    ))}
                </View>
                {/* Résumé des montants */}
                <View style={styles.summary}>
                    <Text style={styles.summaryText}>Total HT : {total} {boutiqueData.monnaie}</Text>
                </View>
                <View style={styles.summary}>
                    <Text style={styles.summaryText}>Réduction : {discount.toFixed(2)} {boutiqueData.monnaie}</Text>
                </View>
                <View style={styles.summary}>
                    <Text style={styles.summaryText}>Total TTC : {totalTTC.toFixed(2)} {boutiqueData.monnaie}</Text>
                </View>

                {/* Informations de paiement */}
                {/* <View style={styles.paymentInfo}>
                    <Text>__ Espèces __ Visa/MasterCard/American Express</Text>
                    <Text>Date d'expiration :</Text>
                </View> */}

                {/* Pied de page */}
                <Text style={styles.footer}>
                    Tous les retours ou échanges de marchandises doivent être accompagnés de ce reçu.
                </Text>
            </Page>
        </Document>
    );
}

const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontSize: 10,
        fontFamily: 'Helvetica',
    },
    header: {
        textAlign: 'center',
        fontSize: 14,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    subHeader: {
        textAlign: 'center',
        fontSize: 10,
        marginBottom: 5,
    },
    clientInfo: {
        marginBottom: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: '#000',
    },
    clientInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop : 2
    },
    tableContainer: {
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#e0e0e0',
        borderBottomWidth: 1,
        borderColor: '#000',
    },
    tableHeaderText: {
        flex: 1,
        padding: 5,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#000',
    },
    tableCell: {
        flex: 1,
        padding: 5,
        textAlign: 'center',
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 5,
    },
    summaryText: {
        width: '50%',
        textAlign: 'right',
        padding: 5,
        borderBottomWidth: 1,
        borderColor: '#000',
    },
    paymentInfo: {
        marginTop: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: '#000',
    },
    footer: {
        marginBottom: 0,
        fontSize: 8,
        color: '#666',
        padding: 10,
    },
});

export default ReceiptRenderer