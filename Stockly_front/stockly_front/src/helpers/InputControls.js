export function PriceInputControl() {
    var firstProduct = document.querySelector('#kt_ecommerce_select2_country option:not([value=""])');

    var prixuInput = document.getElementById('Prix_Vente');
    prixuInput.value = firstProduct ? firstProduct.getAttribute('data-prix') : '';

    document.getElementById('produit').addEventListener('change', function () {
        var selectedProduct = this.options[this.selectedIndex];
        prixuInput.value = selectedProduct ? selectedProduct.getAttribute('data-prix') : '';
    });
}

export function MontantInputControl() {
    var prixuInput = document.getElementById('Prix_Vente');
    var quantiteInput = document.getElementById('Quantite_Vente');
    var montantotalInput = document.getElementById('Montant_Vente');

    prixuInput.addEventListener('input', updateMontantTotal);
    quantiteInput.addEventListener('input', updateMontantTotal);

    function updateMontantTotal() {
        var prixuValue = parseInt(prixuInput.value) || 0;
        var quantiteValue = parseInt(quantiteInput.value) || 0;

        var montantotalValue = prixuValue * quantiteValue;

        montantotalInput.value = montantotalValue.toFixed(2);
    }
}