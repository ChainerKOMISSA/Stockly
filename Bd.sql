CREATE DATABASE LACAMIONNETTE
--ceration des tables

CREATE TABLE Brasserie (
Id_Brasserie int not null identity(1,1) primary key,
Nom_Brasserie nvarchar(250) not null
)

CREATE TABLE Categorie (
Id_Categorie int not null identity(1,1) primary key,
Libelle_Categorie nvarchar(250) not null,
Description_Categorie nvarchar(250) not null)

CREATE TABLE Modele (
Id_Modele int not null identity(1,1) primary key,
Libelle_Modele nvarchar(250) not null)

CREATE TABLE Produit (
Id_Produit int not null identity(1,1),--ajout automatique
Nom_Produit varchar(250) not null,
Prix_Produit int not null)
--clé primaire
ALTER TABLE Produit
ADD Id_Brasserie int ,
Id_Categorie int ,
Id_Modele int 
ADD CONSTRAINT PK_PRODUIT primary key(Id_Produit)



DROP TABLE Vente
CREATE TABLE Vente (
Id_Vente int not null identity(1,1) primary key,
Id_Produit int not null,
Id_Modele int not null,
Prix_Vente int not null,
Quantite_Vente int not null,
Montant_Vente nvarchar(250) not null,
Id_Client int not null,
Date_Vente Datetime not null)

CREATE TABLE Client (
Id_Client int not null identity(1,1)primary key,
Nom_Client varchar(250) not null,
Contact_Client nvarchar(250) not null,
Localisation_Client nvarchar(250) not null)

CREATE TABLE Depense (
Id_Depense int not null identity(1,1) primary key,
Libelle_Depense nvarchar(250) not null,
Montant_Depense int not null,
Date_Depense Datetime not null)


CREATE TABLE Incident (
Id_Incid int not null identity(1,1) primary key,
Libelle_Incid nvarchar(250) not null,
Date_Incid Datetime not null)


DROP TABLE Commande
CREATE TABLE Commande (
Id_Commande int not null identity(1,1) primary key,
Id_Produit int null,
Id_Modele int not null,
Prix_Achat int not null,
Quantite_Cmd int not null,
Montant_Cmd int not null,
Date_Cmd Datetime not null)


DROP TABLE Livraison
CREATE TABLE Livraison (
Id_livraison int not null identity(1,1) primary key,
Nom_Produit varchar(250) not null,
Quantite_Livraison int not null,
Date_Livrason Datetime not null)

CREATE TABLE Utilisateur (
Nom_Ut nvarchar(250) not null primary key,
Mot_de_passe nvarchar(250) not null)

ALTER TABLE Commande
--DROP COLUMN Nom_Client
DROP COLUMN Contact_Client

ALTER TABLE Commande
ADD Id_Client int 
--ADD Id_Client int

select * from Produit
select * from Client

delete from Client


