import React, { useState, useEffect } from 'react'
import { API_URL } from '../../components/constantes'
import { useNavigate } from 'react-router-dom'
import { createSuccessAlert, failureAlert, updateSuccessAlert, deleteSuccessAlert } from '../../components/alerts'
import entrepriseData from '../../helpers/parametresBoutique.json'

const Settings = () => {
    const navigate = useNavigate()
    const [paiements, setPaiements] = useState([])
    const [formData, setFormData] = useState({});
    const [boutiqueData, setBoutiqueData] = useState({});
    const [updateData, setUpdateData] = useState({
        nomBoutique: '',
        sloganBoutique: '',
        adresseBoutique: '',
        ville: '',
        pays: '',
        codePostal: '',
        contactBoutique: '',
        emailBoutique: '',
        monnaie: ''
    });

    useEffect(() => {
        fetch(`${API_URL}/paiements`)
            .then(response => response.json())
            .then(data => {
                setPaiements(data)
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des moyens de paiement: ', error)
            })
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/paiements`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                createSuccessAlert()
                navigate(0)
            } else {
                const errorData = await response.json();
                failureAlert(errorData)
            }
        }
        catch (error) {
            failureAlert(error)
        }
    }

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdateData({
            ...updateData,
            [name]: value,
        });
    }

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

    // const updateBoutique = () => {
    //     fetch(`${API_URL}/boutique`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(updateData)
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             setBoutiqueData({ ...boutiqueData, ...updateData });
    //             createSuccessAlert()
    //             navigate(0)
    //         })
    //         .catch(error => console.error("Erreur de mise à jour des données :", error));
    // };

    const updateBoutique = () => {
        fetch(`${API_URL}/boutique`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
                .then(data => {
                    setBoutiqueData({ ...boutiqueData, ...updateData });
                    createSuccessAlert();
                    navigate(0);
                })
                .catch(error => {
                    console.error(error);
                    // Affichez un message d'erreur à l'utilisateur ici
                    failureAlert(error.message); // Assurez-vous d'avoir une fonction pour afficher l'alerte d'erreur
                })
        })
    };



    return (
        <>
            <div id="kt_app_toolbar" className="app-toolbar pt-7 pt-lg-10">
                <div className="app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100">
                    <div className="page-title d-flex flex-column justify-content-center gap-1 me-3">
                        <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7">
                            <li className="breadcrumb-item text-gray-700 fw-bold lh-1 mx-n1">
                                <a href="index.html" className="text-hover-primary">
                                    <i className="ki-outline ki-home text-gray-700 fs-6"></i>
                                </a>
                            </li>
                            <li className="breadcrumb-item">
                                <i className="ki-outline ki-right fs-7 text-gray-700"></i>
                            </li>
                            <li className="breadcrumb-item text-gray-700 fw-bold lh-1 mx-n1">Accueil</li>
                            <li className="breadcrumb-item">
                                <i className="ki-outline ki-right fs-7 text-gray-700"></i>
                            </li>
                            <li className="breadcrumb-item text-gray-500 mx-n1">Paramètres</li>
                        </ul>
                        <h1 className="page-heading d-flex flex-column justify-content-center text-gray-900 fw-bold fs-3 m-0">Paramètres</h1>
                    </div>
                </div>
            </div>
            <div id="kt_app_content" className="app-content">
                <div className='row'>
                    <div className="col-xl-5">
                        <div className="card card-xl mb-5 mb-xl-8">
                            <div className="card-header align-items-center border-0 mt-4">
                                <h3 className="card-title align-items-start flex-column">
                                    <span className="fw-bold text-gray-900">Informations de l'entreprise</span>
                                    <span className="text-muted mt-1 fw-semibold fs-7">Identité de l'entreprise</span>
                                </h3>
                                <div className="card-toolbar">
                                    <button type="button" className="btn btn-sm btn-icon btn-color-primary btn-active-primary btn-light-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_share_earn2">
                                        <i className="ki-outline ki-pencil fs-6"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="card-body pt-3">
                                <div className="flex-column flex-lg-row-auto w-lg-250px w-xl-350px mb-10">
                                    <div className="d-flex flex-row py-5">
                                        <div className="symbol symbol-90px symbol-circle mb-7">
                                            <img src="assets/media/avatars/300-6.jpg" alt="image" />
                                        </div>
                                    </div>
                                    <div className="separator"></div>
                                    <div className="fw-bold mt-5">Nom de l'entreprise</div>
                                    <div className="text-gray-600">{boutiqueData.nomBoutique ? boutiqueData.nomBoutique : "Aucun nom renseigné"}</div>

                                    <div className="fw-bold mt-5">Slogan</div>
                                    <div className="text-gray-600">{boutiqueData.sloganBoutique ? boutiqueData.sloganBoutique : "Aucun slogan renseigné"}</div>

                                    <div className="fw-bold mt-5">Adresse</div>
                                    <div className="text-gray-600">{boutiqueData.adresseBoutique ? boutiqueData.adresseBoutique : "Aucune adresse renseignée"}</div>

                                    <div className="fw-bold mt-5">Téléphone</div>
                                    <div className="text-gray-600">{boutiqueData.contactBoutique ? boutiqueData.contactBoutique : "Aucun contact renseigné"}</div>

                                    <div className="fw-bold mt-5">Email</div>
                                    <div className="text-gray-600">{boutiqueData.emailBoutique ? boutiqueData.emailBoutique : "Aucun email renseigné"}</div>

                                    <div className="fw-bold mt-5">Ville</div>
                                    <div className="text-gray-600">{boutiqueData.ville ? boutiqueData.ville : "Aucune ville renseignée"}</div>

                                    <div className="fw-bold mt-5">Code postal</div>
                                    <div className="text-gray-600">{boutiqueData.codePostal ? boutiqueData.codePostal : "Aucun code postal renseigné"}</div>

                                    <div className="fw-bold mt-5">Monnaie de transaction</div>
                                    <div className="text-gray-600">{boutiqueData.monnaie ? boutiqueData.monnaie : "Aucune monnaie renseignée"}</div>

                                </div>
                            </div>
                            <div className="modal fade" id="kt_modal_share_earn2" tabIndex="-1" aria-hidden="true" >
                                <div className="modal-dialog modal-dialog-centered mw-700px">
                                    <div className="modal-content">
                                        <div className="modal-header pb-0 border-0 justify-content-end">
                                            <div className="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
                                                <i className="ki-outline ki-cross fs-1"></i>
                                            </div>
                                        </div>
                                        <div className="modal-body scroll-y pt-0 pb-15">
                                            <div className="mw-lg-600px mx-auto">
                                                <div className="mb-13 text-center">
                                                    <h1 className="mb-3">Modifier les informations de la boutique</h1>
                                                    <div className="text-muted fw-semibold fs-5">Entrez les informations.
                                                    </div>
                                                </div>
                                                <form id="kt_account_profile_details_form" class="form">
                                                    <div class="card-body border-top p-9">
                                                        <div class="row mb-6">
                                                            <label class="col-lg-4 col-form-label fw-semibold fs-6">Logo</label>
                                                            <div class="col-lg-8">
                                                                <div class="image-input image-input-outline" data-kt-image-input="true" style={{ backgroundImage: 'assets/media/svg/avatars/blank.svg' }}>
                                                                    <div class="image-input-wrapper w-125px h-125px" style={{ backgroundImage: "assets/media/avatars/300-1.jpg" }} onChange={handleUpdateChange}></div>
                                                                    <label class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="change" data-bs-toggle="tooltip" title="Change avatar">
                                                                        <i class="ki-outline ki-pencil fs-7"></i>
                                                                        <input type="file" name="avatar" accept=".png, .jpg, .jpeg" />
                                                                        <input type="hidden" name="avatar_remove" />
                                                                    </label>
                                                                    <span class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="cancel" data-bs-toggle="tooltip" title="Cancel avatar">
                                                                        <i class="ki-outline ki-cross fs-2"></i>
                                                                    </span>
                                                                    <span class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="remove" data-bs-toggle="tooltip" title="Remove avatar">
                                                                        <i class="ki-outline ki-cross fs-2"></i>
                                                                    </span>
                                                                </div>
                                                                <div class="form-text">Types de fichiers autorisés: png, jpg, jpeg.</div>
                                                            </div>
                                                        </div>
                                                        <div class="row mb-6">
                                                            <label class="col-lg-4 col-form-label required fw-semibold fs-6">Nom de la boutique</label>
                                                            <div class="col-lg-8 fv-row">
                                                                <input type="text" name="nomBoutique" class="form-control form-control-lg form-control-solid" placeholder={boutiqueData.nomBoutique ? boutiqueData.nomBoutique : "Renseignez un nom"} value={updateData.nomBoutique} onChange={handleUpdateChange} />
                                                            </div>
                                                        </div>
                                                        <div class="row mb-6">
                                                            <label class="col-lg-4 col-form-label fw-semibold fs-6">Slogan</label>
                                                            <div class="col-lg-8 fv-row">
                                                                <input type="text" name="sloganBoutique" class="form-control form-control-lg form-control-solid" placeholder={boutiqueData.sloganBoutique ? boutiqueData.sloganBoutique : "Renseignez un slogan"} value={updateData.sloganBoutique} onChange={handleUpdateChange} />
                                                            </div>
                                                        </div>
                                                        <div class="row mb-6">
                                                            <label class="col-lg-4 col-form-label fw-semibold fs-6">
                                                                <span class="required">Téléphone</span>
                                                                <span class="ms-1" data-bs-toggle="tooltip" title="Phone number must be active">
                                                                    <i class="ki-outline ki-information-5 text-gray-500 fs-6"></i>
                                                                </span>
                                                            </label>
                                                            <div class="col-lg-8 fv-row">
                                                                <input type="tel" name="contactBoutique" class="form-control form-control-lg form-control-solid" placeholder={boutiqueData.contactBoutique ? boutiqueData.contactBoutique : "Renseignez un numéro de téléphone"} value={updateData.contactBoutique} onChange={handleUpdateChange} />
                                                            </div>
                                                        </div>
                                                        <div class="row mb-6">
                                                            <label class="col-lg-4 col-form-label fw-semibold fs-6">Email</label>
                                                            <div class="col-lg-8 fv-row">
                                                                <input type="text" name="emailBoutique" class="form-control form-control-lg form-control-solid" placeholder={boutiqueData.emailBoutique ? boutiqueData.emailBoutique : "Entrez une adresse mail"} value={updateData.emailBoutique} onChange={handleUpdateChange} />
                                                            </div>
                                                        </div>
                                                        <div class="row mb-6">
                                                            <label class="col-lg-4 col-form-label fw-semibold fs-6">
                                                                <span class="required">Pays</span>
                                                                <span class="ms-1" data-bs-toggle="tooltip" title="Country of origination">
                                                                    <i class="ki-outline ki-information-5 text-gray-500 fs-6"></i>
                                                                </span>
                                                            </label>
                                                            <div class="col-lg-8 fv-row">
                                                                <select name="pays" aria-label="Select a Country" data-control="select2" data-placeholder={boutiqueData.pays ? boutiqueData.pays : "Sélectionnez un pays..."} class="form-select form-select-solid form-select-lg fw-semibold" value={updateData.pays} onChange={handleUpdateChange}>
                                                                    <option value="">Sélectionnez un pays...</option>
                                                                    <option data-kt-flag="flags/afghanistan.svg" value="AF">Afghanistan</option>
                                                                    <option data-kt-flag="flags/aland-islands.svg" value="AX">Aland Islands</option>
                                                                    <option data-kt-flag="flags/albania.svg" value="AL">Albania</option>
                                                                    <option data-kt-flag="flags/algeria.svg" value="DZ">Algeria</option>
                                                                    <option data-kt-flag="flags/american-samoa.svg" value="AS">American Samoa</option>
                                                                    <option data-kt-flag="flags/andorra.svg" value="AD">Andorra</option>
                                                                    <option data-kt-flag="flags/angola.svg" value="AO">Angola</option>
                                                                    <option data-kt-flag="flags/anguilla.svg" value="AI">Anguilla</option>
                                                                    <option data-kt-flag="flags/antigua-and-barbuda.svg" value="AG">Antigua and Barbuda</option>
                                                                    <option data-kt-flag="flags/argentina.svg" value="AR">Argentina</option>
                                                                    <option data-kt-flag="flags/armenia.svg" value="AM">Armenia</option>
                                                                    <option data-kt-flag="flags/aruba.svg" value="AW">Aruba</option>
                                                                    <option data-kt-flag="flags/australia.svg" value="AU">Australia</option>
                                                                    <option data-kt-flag="flags/austria.svg" value="AT">Austria</option>
                                                                    <option data-kt-flag="flags/azerbaijan.svg" value="AZ">Azerbaijan</option>
                                                                    <option data-kt-flag="flags/bahamas.svg" value="BS">Bahamas</option>
                                                                    <option data-kt-flag="flags/bahrain.svg" value="BH">Bahrain</option>
                                                                    <option data-kt-flag="flags/bangladesh.svg" value="BD">Bangladesh</option>
                                                                    <option data-kt-flag="flags/barbados.svg" value="BB">Barbados</option>
                                                                    <option data-kt-flag="flags/belarus.svg" value="BY">Belarus</option>
                                                                    <option data-kt-flag="flags/belgium.svg" value="BE">Belgium</option>
                                                                    <option data-kt-flag="flags/belize.svg" value="BZ">Belize</option>
                                                                    <option data-kt-flag="flags/benin.svg" value="BJ">Benin</option>
                                                                    <option data-kt-flag="flags/bermuda.svg" value="BM">Bermuda</option>
                                                                    <option data-kt-flag="flags/bhutan.svg" value="BT">Bhutan</option>
                                                                    <option data-kt-flag="flags/bolivia.svg" value="BO">Bolivia, Plurinational State of</option>
                                                                    <option data-kt-flag="flags/bonaire.svg" value="BQ">Bonaire, Sint Eustatius and Saba</option>
                                                                    <option data-kt-flag="flags/bosnia-and-herzegovina.svg" value="BA">Bosnia and Herzegovina</option>
                                                                    <option data-kt-flag="flags/botswana.svg" value="BW">Botswana</option>
                                                                    <option data-kt-flag="flags/brazil.svg" value="BR">Brazil</option>
                                                                    <option data-kt-flag="flags/british-indian-ocean-territory.svg" value="IO">British Indian Ocean Territory</option>
                                                                    <option data-kt-flag="flags/brunei.svg" value="BN">Brunei Darussalam</option>
                                                                    <option data-kt-flag="flags/bulgaria.svg" value="BG">Bulgaria</option>
                                                                    <option data-kt-flag="flags/burkina-faso.svg" value="BF">Burkina Faso</option>
                                                                    <option data-kt-flag="flags/burundi.svg" value="BI">Burundi</option>
                                                                    <option data-kt-flag="flags/cambodia.svg" value="KH">Cambodia</option>
                                                                    <option data-kt-flag="flags/cameroon.svg" value="CM">Cameroon</option>
                                                                    <option data-kt-flag="flags/canada.svg" value="CA">Canada</option>
                                                                    <option data-kt-flag="flags/cape-verde.svg" value="CV">Cape Verde</option>
                                                                    <option data-kt-flag="flags/cayman-islands.svg" value="KY">Cayman Islands</option>
                                                                    <option data-kt-flag="flags/central-african-republic.svg" value="CF">Central African Republic</option>
                                                                    <option data-kt-flag="flags/chad.svg" value="TD">Chad</option>
                                                                    <option data-kt-flag="flags/chile.svg" value="CL">Chile</option>
                                                                    <option data-kt-flag="flags/china.svg" value="CN">China</option>
                                                                    <option data-kt-flag="flags/christmas-island.svg" value="CX">Christmas Island</option>
                                                                    <option data-kt-flag="flags/cocos-island.svg" value="CC">Cocos (Keeling) Islands</option>
                                                                    <option data-kt-flag="flags/colombia.svg" value="CO">Colombia</option>
                                                                    <option data-kt-flag="flags/comoros.svg" value="KM">Comoros</option>
                                                                    <option data-kt-flag="flags/cook-islands.svg" value="CK">Cook Islands</option>
                                                                    <option data-kt-flag="flags/costa-rica.svg" value="CR">Costa Rica</option>
                                                                    <option data-kt-flag="flags/ivory-coast.svg" value="CI">Côte d'Ivoire</option>
                                                                    <option data-kt-flag="flags/croatia.svg" value="HR">Croatia</option>
                                                                    <option data-kt-flag="flags/cuba.svg" value="CU">Cuba</option>
                                                                    <option data-kt-flag="flags/curacao.svg" value="CW">Curaçao</option>
                                                                    <option data-kt-flag="flags/czech-republic.svg" value="CZ">Czech Republic</option>
                                                                    <option data-kt-flag="flags/denmark.svg" value="DK">Denmark</option>
                                                                    <option data-kt-flag="flags/djibouti.svg" value="DJ">Djibouti</option>
                                                                    <option data-kt-flag="flags/dominica.svg" value="DM">Dominica</option>
                                                                    <option data-kt-flag="flags/dominican-republic.svg" value="DO">Dominican Republic</option>
                                                                    <option data-kt-flag="flags/ecuador.svg" value="EC">Ecuador</option>
                                                                    <option data-kt-flag="flags/egypt.svg" value="EG">Egypt</option>
                                                                    <option data-kt-flag="flags/el-salvador.svg" value="SV">El Salvador</option>
                                                                    <option data-kt-flag="flags/equatorial-guinea.svg" value="GQ">Equatorial Guinea</option>
                                                                    <option data-kt-flag="flags/eritrea.svg" value="ER">Eritrea</option>
                                                                    <option data-kt-flag="flags/estonia.svg" value="EE">Estonia</option>
                                                                    <option data-kt-flag="flags/ethiopia.svg" value="ET">Ethiopia</option>
                                                                    <option data-kt-flag="flags/falkland-islands.svg" value="FK">Falkland Islands (Malvinas)</option>
                                                                    <option data-kt-flag="flags/fiji.svg" value="FJ">Fiji</option>
                                                                    <option data-kt-flag="flags/finland.svg" value="FI">Finland</option>
                                                                    <option data-kt-flag="flags/france.svg" value="FR">France</option>
                                                                    <option data-kt-flag="flags/french-polynesia.svg" value="PF">French Polynesia</option>
                                                                    <option data-kt-flag="flags/gabon.svg" value="GA">Gabon</option>
                                                                    <option data-kt-flag="flags/gambia.svg" value="GM">Gambia</option>
                                                                    <option data-kt-flag="flags/georgia.svg" value="GE">Georgia</option>
                                                                    <option data-kt-flag="flags/germany.svg" value="DE">Germany</option>
                                                                    <option data-kt-flag="flags/ghana.svg" value="GH">Ghana</option>
                                                                    <option data-kt-flag="flags/gibraltar.svg" value="GI">Gibraltar</option>
                                                                    <option data-kt-flag="flags/greece.svg" value="GR">Greece</option>
                                                                    <option data-kt-flag="flags/greenland.svg" value="GL">Greenland</option>
                                                                    <option data-kt-flag="flags/grenada.svg" value="GD">Grenada</option>
                                                                    <option data-kt-flag="flags/guam.svg" value="GU">Guam</option>
                                                                    <option data-kt-flag="flags/guatemala.svg" value="GT">Guatemala</option>
                                                                    <option data-kt-flag="flags/guernsey.svg" value="GG">Guernsey</option>
                                                                    <option data-kt-flag="flags/guinea.svg" value="GN">Guinea</option>
                                                                    <option data-kt-flag="flags/guinea-bissau.svg" value="GW">Guinea-Bissau</option>
                                                                    <option data-kt-flag="flags/haiti.svg" value="HT">Haiti</option>
                                                                    <option data-kt-flag="flags/vatican-city.svg" value="VA">Holy See (Vatican City State)</option>
                                                                    <option data-kt-flag="flags/honduras.svg" value="HN">Honduras</option>
                                                                    <option data-kt-flag="flags/hong-kong.svg" value="HK">Hong Kong</option>
                                                                    <option data-kt-flag="flags/hungary.svg" value="HU">Hungary</option>
                                                                    <option data-kt-flag="flags/iceland.svg" value="IS">Iceland</option>
                                                                    <option data-kt-flag="flags/india.svg" value="IN">India</option>
                                                                    <option data-kt-flag="flags/indonesia.svg" value="ID">Indonesia</option>
                                                                    <option data-kt-flag="flags/iran.svg" value="IR">Iran, Islamic Republic of</option>
                                                                    <option data-kt-flag="flags/iraq.svg" value="IQ">Iraq</option>
                                                                    <option data-kt-flag="flags/ireland.svg" value="IE">Ireland</option>
                                                                    <option data-kt-flag="flags/isle-of-man.svg" value="IM">Isle of Man</option>
                                                                    <option data-kt-flag="flags/israel.svg" value="IL">Israel</option>
                                                                    <option data-kt-flag="flags/italy.svg" value="IT">Italy</option>
                                                                    <option data-kt-flag="flags/jamaica.svg" value="JM">Jamaica</option>
                                                                    <option data-kt-flag="flags/japan.svg" value="JP">Japan</option>
                                                                    <option data-kt-flag="flags/jersey.svg" value="JE">Jersey</option>
                                                                    <option data-kt-flag="flags/jordan.svg" value="JO">Jordan</option>
                                                                    <option data-kt-flag="flags/kazakhstan.svg" value="KZ">Kazakhstan</option>
                                                                    <option data-kt-flag="flags/kenya.svg" value="KE">Kenya</option>
                                                                    <option data-kt-flag="flags/kiribati.svg" value="KI">Kiribati</option>
                                                                    <option data-kt-flag="flags/north-korea.svg" value="KP">Korea, Democratic People's Republic of</option>
                                                                    <option data-kt-flag="flags/kuwait.svg" value="KW">Kuwait</option>
                                                                    <option data-kt-flag="flags/kyrgyzstan.svg" value="KG">Kyrgyzstan</option>
                                                                    <option data-kt-flag="flags/laos.svg" value="LA">Lao People's Democratic Republic</option>
                                                                    <option data-kt-flag="flags/latvia.svg" value="LV">Latvia</option>
                                                                    <option data-kt-flag="flags/lebanon.svg" value="LB">Lebanon</option>
                                                                    <option data-kt-flag="flags/lesotho.svg" value="LS">Lesotho</option>
                                                                    <option data-kt-flag="flags/liberia.svg" value="LR">Liberia</option>
                                                                    <option data-kt-flag="flags/libya.svg" value="LY">Libya</option>
                                                                    <option data-kt-flag="flags/liechtenstein.svg" value="LI">Liechtenstein</option>
                                                                    <option data-kt-flag="flags/lithuania.svg" value="LT">Lithuania</option>
                                                                    <option data-kt-flag="flags/luxembourg.svg" value="LU">Luxembourg</option>
                                                                    <option data-kt-flag="flags/macao.svg" value="MO">Macao</option>
                                                                    <option data-kt-flag="flags/madagascar.svg" value="MG">Madagascar</option>
                                                                    <option data-kt-flag="flags/malawi.svg" value="MW">Malawi</option>
                                                                    <option data-kt-flag="flags/malaysia.svg" value="MY">Malaysia</option>
                                                                    <option data-kt-flag="flags/maldives.svg" value="MV">Maldives</option>
                                                                    <option data-kt-flag="flags/mali.svg" value="ML">Mali</option>
                                                                    <option data-kt-flag="flags/malta.svg" value="MT">Malta</option>
                                                                    <option data-kt-flag="flags/marshall-island.svg" value="MH">Marshall Islands</option>
                                                                    <option data-kt-flag="flags/martinique.svg" value="MQ">Martinique</option>
                                                                    <option data-kt-flag="flags/mauritania.svg" value="MR">Mauritania</option>
                                                                    <option data-kt-flag="flags/mauritius.svg" value="MU">Mauritius</option>
                                                                    <option data-kt-flag="flags/mexico.svg" value="MX">Mexico</option>
                                                                    <option data-kt-flag="flags/micronesia.svg" value="FM">Micronesia, Federated States of</option>
                                                                    <option data-kt-flag="flags/moldova.svg" value="MD">Moldova, Republic of</option>
                                                                    <option data-kt-flag="flags/monaco.svg" value="MC">Monaco</option>
                                                                    <option data-kt-flag="flags/mongolia.svg" value="MN">Mongolia</option>
                                                                    <option data-kt-flag="flags/montenegro.svg" value="ME">Montenegro</option>
                                                                    <option data-kt-flag="flags/montserrat.svg" value="MS">Montserrat</option>
                                                                    <option data-kt-flag="flags/morocco.svg" value="MA">Morocco</option>
                                                                    <option data-kt-flag="flags/mozambique.svg" value="MZ">Mozambique</option>
                                                                    <option data-kt-flag="flags/myanmar.svg" value="MM">Myanmar</option>
                                                                    <option data-kt-flag="flags/namibia.svg" value="NA">Namibia</option>
                                                                    <option data-kt-flag="flags/nauru.svg" value="NR">Nauru</option>
                                                                    <option data-kt-flag="flags/nepal.svg" value="NP">Nepal</option>
                                                                    <option data-kt-flag="flags/netherlands.svg" value="NL">Netherlands</option>
                                                                    <option data-kt-flag="flags/new-zealand.svg" value="NZ">New Zealand</option>
                                                                    <option data-kt-flag="flags/nicaragua.svg" value="NI">Nicaragua</option>
                                                                    <option data-kt-flag="flags/niger.svg" value="NE">Niger</option>
                                                                    <option data-kt-flag="flags/nigeria.svg" value="NG">Nigeria</option>
                                                                    <option data-kt-flag="flags/niue.svg" value="NU">Niue</option>
                                                                    <option data-kt-flag="flags/norfolk-island.svg" value="NF">Norfolk Island</option>
                                                                    <option data-kt-flag="flags/northern-mariana-islands.svg" value="MP">Northern Mariana Islands</option>
                                                                    <option data-kt-flag="flags/norway.svg" value="NO">Norway</option>
                                                                    <option data-kt-flag="flags/oman.svg" value="OM">Oman</option>
                                                                    <option data-kt-flag="flags/pakistan.svg" value="PK">Pakistan</option>
                                                                    <option data-kt-flag="flags/palau.svg" value="PW">Palau</option>
                                                                    <option data-kt-flag="flags/palestine.svg" value="PS">Palestinian Territory, Occupied</option>
                                                                    <option data-kt-flag="flags/panama.svg" value="PA">Panama</option>
                                                                    <option data-kt-flag="flags/papua-new-guinea.svg" value="PG">Papua New Guinea</option>
                                                                    <option data-kt-flag="flags/paraguay.svg" value="PY">Paraguay</option>
                                                                    <option data-kt-flag="flags/peru.svg" value="PE">Peru</option>
                                                                    <option data-kt-flag="flags/philippines.svg" value="PH">Philippines</option>
                                                                    <option data-kt-flag="flags/poland.svg" value="PL">Poland</option>
                                                                    <option data-kt-flag="flags/portugal.svg" value="PT">Portugal</option>
                                                                    <option data-kt-flag="flags/puerto-rico.svg" value="PR">Puerto Rico</option>
                                                                    <option data-kt-flag="flags/qatar.svg" value="QA">Qatar</option>
                                                                    <option data-kt-flag="flags/romania.svg" value="RO">Romania</option>
                                                                    <option data-kt-flag="flags/russia.svg" value="RU">Russian Federation</option>
                                                                    <option data-kt-flag="flags/rwanda.svg" value="RW">Rwanda</option>
                                                                    <option data-kt-flag="flags/st-barts.svg" value="BL">Saint Barthélemy</option>
                                                                    <option data-kt-flag="flags/saint-kitts-and-nevis.svg" value="KN">Saint Kitts and Nevis</option>
                                                                    <option data-kt-flag="flags/st-lucia.svg" value="LC">Saint Lucia</option>
                                                                    <option data-kt-flag="flags/sint-maarten.svg" value="MF">Saint Martin (French part)</option>
                                                                    <option data-kt-flag="flags/st-vincent-and-the-grenadines.svg" value="VC">Saint Vincent and the Grenadines</option>
                                                                    <option data-kt-flag="flags/samoa.svg" value="WS">Samoa</option>
                                                                    <option data-kt-flag="flags/san-marino.svg" value="SM">San Marino</option>
                                                                    <option data-kt-flag="flags/sao-tome-and-prince.svg" value="ST">Sao Tome and Principe</option>
                                                                    <option data-kt-flag="flags/saudi-arabia.svg" value="SA">Saudi Arabia</option>
                                                                    <option data-kt-flag="flags/senegal.svg" value="SN">Senegal</option>
                                                                    <option data-kt-flag="flags/serbia.svg" value="RS">Serbia</option>
                                                                    <option data-kt-flag="flags/seychelles.svg" value="SC">Seychelles</option>
                                                                    <option data-kt-flag="flags/sierra-leone.svg" value="SL">Sierra Leone</option>
                                                                    <option data-kt-flag="flags/singapore.svg" value="SG">Singapore</option>
                                                                    <option data-kt-flag="flags/sint-maarten.svg" value="SX">Sint Maarten (Dutch part)</option>
                                                                    <option data-kt-flag="flags/slovakia.svg" value="SK">Slovakia</option>
                                                                    <option data-kt-flag="flags/slovenia.svg" value="SI">Slovenia</option>
                                                                    <option data-kt-flag="flags/solomon-islands.svg" value="SB">Solomon Islands</option>
                                                                    <option data-kt-flag="flags/somalia.svg" value="SO">Somalia</option>
                                                                    <option data-kt-flag="flags/south-africa.svg" value="ZA">South Africa</option>
                                                                    <option data-kt-flag="flags/south-korea.svg" value="KR">South Korea</option>
                                                                    <option data-kt-flag="flags/south-sudan.svg" value="SS">South Sudan</option>
                                                                    <option data-kt-flag="flags/spain.svg" value="ES">Spain</option>
                                                                    <option data-kt-flag="flags/sri-lanka.svg" value="LK">Sri Lanka</option>
                                                                    <option data-kt-flag="flags/sudan.svg" value="SD">Sudan</option>
                                                                    <option data-kt-flag="flags/suriname.svg" value="SR">Suriname</option>
                                                                    <option data-kt-flag="flags/swaziland.svg" value="SZ">Swaziland</option>
                                                                    <option data-kt-flag="flags/sweden.svg" value="SE">Sweden</option>
                                                                    <option data-kt-flag="flags/switzerland.svg" value="CH">Switzerland</option>
                                                                    <option data-kt-flag="flags/syria.svg" value="SY">Syrian Arab Republic</option>
                                                                    <option data-kt-flag="flags/taiwan.svg" value="TW">Taiwan, Province of China</option>
                                                                    <option data-kt-flag="flags/tajikistan.svg" value="TJ">Tajikistan</option>
                                                                    <option data-kt-flag="flags/tanzania.svg" value="TZ">Tanzania, United Republic of</option>
                                                                    <option data-kt-flag="flags/thailand.svg" value="TH">Thailand</option>
                                                                    <option data-kt-flag="flags/togo.svg" value="TG">Togo</option>
                                                                    <option data-kt-flag="flags/tokelau.svg" value="TK">Tokelau</option>
                                                                    <option data-kt-flag="flags/tonga.svg" value="TO">Tonga</option>
                                                                    <option data-kt-flag="flags/trinidad-and-tobago.svg" value="TT">Trinidad and Tobago</option>
                                                                    <option data-kt-flag="flags/tunisia.svg" value="TN">Tunisia</option>
                                                                    <option data-kt-flag="flags/turkey.svg" value="TR">Turkey</option>
                                                                    <option data-kt-flag="flags/turkmenistan.svg" value="TM">Turkmenistan</option>
                                                                    <option data-kt-flag="flags/turks-and-caicos.svg" value="TC">Turks and Caicos Islands</option>
                                                                    <option data-kt-flag="flags/tuvalu.svg" value="TV">Tuvalu</option>
                                                                    <option data-kt-flag="flags/uganda.svg" value="UG">Uganda</option>
                                                                    <option data-kt-flag="flags/ukraine.svg" value="UA">Ukraine</option>
                                                                    <option data-kt-flag="flags/united-arab-emirates.svg" value="AE">United Arab Emirates</option>
                                                                    <option data-kt-flag="flags/united-kingdom.svg" value="GB">United Kingdom</option>
                                                                    <option data-kt-flag="flags/united-states.svg" value="US">United States</option>
                                                                    <option data-kt-flag="flags/uruguay.svg" value="UY">Uruguay</option>
                                                                    <option data-kt-flag="flags/uzbekistan.svg" value="UZ">Uzbekistan</option>
                                                                    <option data-kt-flag="flags/vanuatu.svg" value="VU">Vanuatu</option>
                                                                    <option data-kt-flag="flags/venezuela.svg" value="VE">Venezuela, Bolivarian Republic of</option>
                                                                    <option data-kt-flag="flags/vietnam.svg" value="VN">Vietnam</option>
                                                                    <option data-kt-flag="flags/virgin-islands.svg" value="VI">Virgin Islands</option>
                                                                    <option data-kt-flag="flags/yemen.svg" value="YE">Yemen</option>
                                                                    <option data-kt-flag="flags/zambia.svg" value="ZM">Zambia</option>
                                                                    <option data-kt-flag="flags/zimbabwe.svg" value="ZW">Zimbabwe</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="row mb-6">
                                                            <label class="col-lg-4 col-form-label fw-semibold fs-6">Ville</label>
                                                            <div class="col-lg-8 fv-row">
                                                                <input type="text" name="ville" class="form-control form-control-lg form-control-solid" placeholder={boutiqueData.ville ? boutiqueData.ville : "Renseignez la ville"} value={updateData.ville} onChange={handleUpdateChange} />
                                                            </div>
                                                        </div>
                                                        <div class="row mb-6">
                                                            <label class="col-lg-4 col-form-label fw-semibold fs-6">Code Postal</label>
                                                            <div class="col-lg-8 fv-row">
                                                                <input type="text" name="codePostal" class="form-control form-control-lg form-control-solid" placeholder={boutiqueData.codePostal ? boutiqueData.codePostal : "Renseignez le code postal"} value={updateData.codePostal} onChange={handleUpdateChange} />
                                                            </div>
                                                        </div>
                                                        <div class="row mb-6">
                                                            <label class="col-lg-4 col-form-label fw-semibold fs-6">Adresse</label>
                                                            <div class="col-lg-8 fv-row">boutiqueData
                                                                <input type="text" name="adresseBoutique" class="form-control form-control-lg form-control-solid" placeholder={boutiqueData.adresseBoutique ? boutiqueData.adresseBoutique : "Renseignez une adresse"} value={updateData.adresseBoutique} onChange={handleUpdateChange} />
                                                            </div>
                                                        </div>

                                                        <div class="row mb-6">
                                                            <label class="col-lg-4 col-form-label fw-semibold fs-6">Monnaie</label>
                                                            <div class="col-lg-8 fv-row">
                                                                <select name="monnaie" aria-label="Select a Currency" data-control="select2" data-placeholder={boutiqueData.monnaiee ? boutiqueData.monnaie : "Sélectionner une monnaie.."} class="form-select form-select-solid form-select-lg" value={updateData.monnaie} onChange={handleUpdateChange}>
                                                                    <option value="">Sélectionner une monnaie..</option>
                                                                    <option data-kt-flag="flags/united-states.svg" value="FCFA">
                                                                        <b>FCFA</b>&nbsp;-&nbsp;Franc CFA</option>
                                                                    <option data-kt-flag="flags/united-states.svg" value="€">
                                                                        <b>€</b>&nbsp;-&nbsp;Euro</option>
                                                                    <option data-kt-flag="flags/united-states.svg" value="USD">
                                                                        <b>USD</b>&nbsp;-&nbsp;USA dollar</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card-footer d-flex justify-content-end py-6 px-9">
                                                        <button type="reset" class="btn btn-light btn-active-light-primary me-2">Annuler</button>
                                                        <button type="submit" class="btn btn-primary" id="kt_account_profile_details_submit" onClick={updateBoutique}>Enregistrer les modifications</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-7">
                        <div class="card card-xl-stretch mb-8">
                            <div class="card-header align-items-center border-0 mt-4">
                                <h3 class="card-title align-items-start flex-column">
                                    <span class="fw-bold text-gray-900">Méthodes de paiement</span>
                                    <span class="text-muted mt-1 fw-semibold fs-7">Affichage en bas du reçu</span>
                                </h3>
                                <div class="card-toolbar">
                                    <button type="button" class="btn btn-sm btn-icon btn-light-primary btn-active-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_share_earn">
                                        <i class="ki-outline ki-plus fs-6"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body pt-3">
                                {
                                    paiements.map((paiement, index) => (
                                        <div class="d-flex align-items-sm-center mb-7" key={index}>
                                            <div class="symbol symbol-60px symbol-2by3 me-4">
                                                <div class="symbol-label bg-light-primary"><i class="ki-outline ki-credit-cart text-primary fs-2qx"></i></div>
                                            </div>
                                            <div class="d-flex flex-row-fluid flex-wrap align-items-center">
                                                <div class="flex-grow-1 me-2">
                                                    <a class="text-gray-800 fw-bold text-hover-primary fs-6">{paiement.libellePaiement}</a>
                                                    <span class="text-muted fw-semibold d-block pt-1">{paiement.descriptionPaiement}</span>
                                                </div>
                                                <span class="badge badge-light-success fs-8 fw-bold my-2">Disponible</span>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className="modal fade" id="kt_modal_share_earn" tabIndex="-1" aria-hidden="true" >
                                <div className="modal-dialog modal-dialog-centered mw-500px">
                                    <div className="modal-content">
                                        <div className="modal-header pb-0 border-0 justify-content-end">
                                            <div className="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
                                                <i className="ki-outline ki-cross fs-1"></i>
                                            </div>
                                        </div>
                                        <div className="modal-body scroll-y pt-0 pb-15">
                                            <div className="mw-lg-600px mx-auto">
                                                <div className="mb-13 text-center">
                                                    <h1 className="mb-3">Ajouter un moyen de paiement</h1>
                                                    <div className="text-muted fw-semibold fs-5">Entrez les informations.
                                                    </div>
                                                </div>
                                                <form id="kt_ecommerce_settings_general_form" className="form">
                                                    <div className="fv-row mb-7">
                                                        <label className="fs-6 fw-semibold form-label mt-3">
                                                            <span className="required">Libellé</span>
                                                            <span className="ms-1" data-bs-toggle="tooltip" title="Entrez le libellé">
                                                                <i className="ki-outline ki-information fs-7"></i>
                                                            </span>
                                                        </label>
                                                        <input type="text" className="form-control form-control-solid" name="libellePaiement" value={formData.libellePaiement} onChange={handleChange} />
                                                    </div>
                                                    <div className="fv-row mb-7">
                                                        <label className="fs-6 fw-semibold form-label mt-3">
                                                            <span className="required">Description</span>
                                                            <span className="ms-1" data-bs-toggle="tooltip" title="Ajoutez une description">
                                                                <i className="ki-outline ki-information fs-7"></i>
                                                            </span>
                                                        </label>
                                                        <input type="text" className="form-control form-control-solid" name="descriptionPaiement" value={formData.descriptionPaiement} onChange={handleChange} />
                                                    </div>
                                                    <div className="separator mb-6"></div>
                                                    <div className="d-flex justify-content-end">
                                                        <button type="reset" data-kt-contacts-type="cancel" class="btn btn-light me-3">Annuler</button>
                                                        <button className="btn btn-primary" >
                                                            <span className="indicator-label" onClick={handleSubmit}>Ajouter</span>
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Settings