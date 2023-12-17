CREATE DATABASE dbstockly

CREATE TABLE Categorie (
Id_Categorie int not null primary key AUTO_INCREMENT,
Libelle_Categorie varchar(25) not null,
Description_Categorie varchar(300) not null)


CREATE TABLE Produit (
Id_Produit int not null primary key AUTO_INCREMENT,
Nom_Produit varchar(100) not null,
Prix_Produit int not null,
Quantite_stock int not null,
Id_Categorie int)

ALTER TABLE Produit
ADD CONSTRAINT FK_CATEGORIE foreign key(Id_Categorie) references Categorie(Id_Categorie)

CREATE TABLE Depense (
Id_Depense int not null primary key AUTO_INCREMENT,
Libelle_Depense varchar(250) not null,
Montant_Depense int not null,
Date_Depense Datetime not null)


CREATE TABLE Role ( 
Id_Role int not null primary key AUTO_INCREMENT, 
Libelle_Role varchar(25) not null, 
Mot_de_passe varchar(50) not null);


CREATE TABLE Utilisateur (
Id_User int not null primary key AUTO_INCREMENT,
Nom_User varchar(100) not null,
Mot_de_passe varchar(250) not null,
Id_Role int not null);

ALTER TABLE Utilisateur 
ADD CONSTRAINT FK_ROLE FOREIGN KEY (Id_Role) REFERENCES Role(Id_Role)


CREATE TABLE Incident (
Id_Incid int not null primary key AUTO_INCREMENT,
Libelle_Incid varchar(250) not null,
Date_Incid Datetime not null)


CREATE TABLE Fournisseur (
Id_Frs int not null primary key AUTO_INCREMENT,
Nom_Frs varchar(250) not null,
Contact_Frs varchar(25) not null,
Adresse_Frs varchar(250) not null);


CREATE TABLE Commande (
Id_Commande int not null primary key AUTO_INCREMENT,
Id_Produit int null,
Id_Frs int not null,
Prix_Achat int not null,
Quantite_Cmd int not null,
Montant_Cmd int not null,
Date_Cmd Datetime not null);

ALTER TABLE Commande
ADD CONSTRAINT FK_PRODUIT FOREIGN KEY (Id_Produit) REFERENCES produit(Id_Produit),

ALTER TABLE Commande
ADD CONSTRAINT FK_PRODUIT FOREIGN KEY (Id_Frs) REFERENCES fournisseur(Id_Frs)

CREATE TABLE Livraison (
Id_Livraison int not null primary key AUTO_INCREMENT,
Id_Commande int not null,
Date_Livraison Datetime not null)


CREATE TABLE Vente (
Id_Vente int not null primary key AUTO_INCREMENT,
Id_Produit int not null,
Prix_Vente int not null,
Quantite_Vente int not null,
Montant_Vente nvarchar(250) not null,
Date_Vente Datetime not null)

ALTER TABLE Vente
ADD CONSTRAINT FK_PRODUIT FOREIGN KEY (Id_Produit) REFERENCES produit(Id_Produit)
