const os = require('os')
function getIp(){
    var ipAddress
    const ifaces = os.networkInterfaces()

    Object.keys(ifaces).forEach((ifName) => {

        ifaces[ifName].forEach((iface) => {
            if(iface.family !== 'IPv4' || iface.internal != false || iface.address.includes('169.254')){
                // This skip non-ipv4 addresses and skip local host, the las conditinal skip addresses from protocol APIPA
                return
            }
            ipAddress = iface.address
        })
    })
    return ipAddress
}
module.exports = getIp()