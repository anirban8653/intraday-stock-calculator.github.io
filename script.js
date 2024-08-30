function calculateStock() {
    let current_price = parseFloat(document.getElementById("current_price").value);
    let future_price = parseFloat(document.getElementById("future_price").value);
    let total_share = parseInt(document.getElementById("total_share").value);

    let margin = 5;
    let stop_loss_per = 1.5 / 100;

    let total_price_c = current_price * total_share;
    let my_price = total_price_c / margin;
    let broker_price = total_price_c - my_price;

    let total_price_f = future_price * total_share;
    let turnover = total_price_f + total_price_c;

    let net_price = total_price_f - broker_price;
    let change = net_price - my_price;
    let change_p = (change * 100) / my_price;

    // Charges
    let broker_charge = turnover * 0.05 / 100;
    let stt = 0.025 / 100 * total_price_f;
    let sd = 0.003 / 100 * total_price_c;
    let etc = 0.00322 / 100 * turnover;
    let sebi = 0.0001 / 100 * turnover;
    let ipft = 0.0001 / 100 * turnover;

    let gst = 18 / 100 * (broker_charge + sebi + etc + sd + ipft + stt);
    let total_charge = broker_charge + sebi + etc + sd + ipft + stt + gst;

    let net_pl = change - total_charge;

    let gross_label = future_price > current_price ? "Gross Gain" : "Gross Loss";
    let net_label = future_price > current_price ? "Net Gain" : "Net Loss";

    // Generate the result table
    let result_table = `
        <table>
            <tr><th>Label</th><th>Amount</th><th>P/L</th><th>Margin (X)</th><th>Charge Type</th><th>Amount</th></tr>
            <tr><td>Start Wallet</td><td>${my_price.toFixed(2)}</td><td></td><td></td><td>Broker Charge</td><td>${broker_charge.toFixed(2)}</td></tr>
            <tr><td>Broker Price</td><td>${broker_price.toFixed(2)}</td><td></td><td>${margin}</td><td>STT</td><td>${stt.toFixed(2)}</td></tr>
            <tr><td>Current Total price</td><td>${total_price_c.toFixed(2)}</td><td></td><td></td><td>ETC</td><td>${etc.toFixed(2)}</td></tr>
            <tr><td>Future Total price</td><td>${total_price_f.toFixed(2)}</td><td></td><td></td><td>SEBI</td><td>${sebi.toFixed(2)}</td></tr>
            <tr><td>${gross_label}</td><td>${change.toFixed(2)}</td><td>${change_p.toFixed(2)}%</td><td></td><td>SD</td><td>${sd.toFixed(2)}</td></tr>
            <tr><td>${net_label}</td><td>${net_pl.toFixed(2)}</td><td>${(net_pl * 100 / my_price).toFixed(2)}%</td><td></td><td>IPFT</td><td>${ipft.toFixed(2)}</td></tr>
            <tr><td>Stop Loss</td><td>${(current_price * (1 - stop_loss_per)).toFixed(2)}</td><td>${(stop_loss_per * 100).toFixed(2)}%</td><td></td><td>GST</td><td>${gst.toFixed(2)}</td></tr>
            <tr><td>End Wallet</td><td>${(net_price - total_charge).toFixed(2)}</td><td></td><td></td><td>Total Charges</td><td>${total_charge.toFixed(2)}</td></tr>
        </table>
    `;

    document.getElementById("result").innerHTML = result_table;
}
