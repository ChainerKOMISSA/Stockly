import React, { useState, useEffect } from 'react';

export function MontantInputControl() {
    const [montantotal, setMontantotal] = useState(0);

    function updateMontantTotal() {
        const prixuValue = parseInt(document.getElementById('Prix_Vente').value) || 0;
        const quantiteValue = parseInt(document.getElementsByName('Quantite_Vente')[0].value) || 0;
        const montantotalValue = prixuValue * quantiteValue;
        setMontantotal(montantotalValue.toFixed(2));
    }

    useEffect(() => {
        const prixuInput = document.getElementById('Prix_Vente');
        const quantiteInput = document.getElementsByName('Quantite_Vente')[0];

        prixuInput.addEventListener('input', updateMontantTotal);
        quantiteInput.addEventListener('input', updateMontantTotal);

        return () => {
            prixuInput.removeEventListener('input', updateMontantTotal);
            quantiteInput.removeEventListener('input', updateMontantTotal);
        };
    }, []);

    return (
        <input
            type="text"
            className="form-control form-control-solid"
            name="Montant_Vente"
            value={montantotal}
            onChange={() => { }}
            readOnly
        />
    );
}