export default function (data, orderName) {
    var mywindow = window.open('', orderName, 'height=600,width=800');
    mywindow.document.write('<html><head><title>my div</title>');
    mywindow.document.write('<link rel="stylesheet" type="text/css" media="screen" href="vendor/bootstrap/dist/css/bootstrap.min.css">');
    mywindow.document.write('<link rel="stylesheet" type="text/css" media="screen" href="styles/print.css">');
    mywindow.document.write('</head><body>');
    mywindow.document.write('<div class="section-to-print">')
    mywindow.document.write(data);
    mywindow.document.write('</div></body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10

    mywindow.print();
    mywindow.close();

    return true;
}