let PhoneNumber = require('awesome-phonenumber')
let levelling = require('../lib/levelling')

let handler = async (m, { conn, usedPrefix }) => {

  let pp = './Caja.jpg'
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  try {
//    pp = await conn.getProfilePicture(who)
  } catch (e) {

  } finally {
    let about = (await conn.getStatus(who).catch(console.error) || {}).status || ''
    let { name, limit, exp, banned, lastclaim, registered, regTime, age, level } = global.DATABASE.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let username = conn.getName(who)
    let str = `
*_γπ Β‘Hola! ${username} πε½‘_*
β‘οΈ *CAJA DE ALMECENAMIENTO* β‘οΈ

*Β‘Te presentamos Caja de Almacenamiento!* 
_En donde podrΓ‘s guardar mensajes/archivos multimedia. Para luego verlos con un comando personalizado._

β *AGREGAR A LA LISTA* 
*Ejemplo:* ${usedPrefix}agregarmsg comando1

βπ¦ _${usedPrefix}agregarmsg *comando/palabra clave* (responde a un texto)_
βπ¦ _${usedPrefix}agregarvn *comando/palabra clave* (responde a una nota de voz)_
βπ¦ _${usedPrefix}agregarvideo *comando/palabra clave* (responde a un video)_
βπ¦ _${usedPrefix}agregaraudio *comando/palabra clave* (responde a un audio)_
βπ¦ _${usedPrefix}agregarimg *comando/palabra clave* (responde a una imagen)_
βπ¦ _${usedPrefix}agregarsticker *comando/palabra clave* (responde a un sticker)_
*_NOTA:_* tiene que responder al mensaje/archivo multimedia para ser agregado.


β³οΈ *LISTAS DE COMANDOS*

βπ _${usedPrefix}listamsg_
βπ _${usedPrefix}listavn_
βπ _${usedPrefix}listavideo_
βπ _${usedPrefix}listaaudio_
βπ _${usedPrefix}listaimg_
βπ _${usedPrefix}listasticker_


βοΈ *VER TEXTOS O ARCHIVOS*
*_Para ver el contenido del comando personalizado:_*
*Ejemplo:* ${usedPrefix}vermsg comando1

βπ _${usedPrefix}vermsg *comando/palabra clave*_
βπ _${usedPrefix}vervn *comando/palabra clave*_
βπ _${usedPrefix}vervideo *comando/palabra clave*_
βπ _${usedPrefix}veraudio *comando/palabra clave*_
βπ _${usedPrefix}verimg *comando/palabra clave*_
βπ _${usedPrefix}versticker *comando/palabra clave*_


β *ELIMINAR COMANDO/PALABRA*
*_Para eliminar el comando personalizado:_*
*Ejemplo:* ${usedPrefix}eliminarmsg comando1

βπ _${usedPrefix}eliminarmsg *comando/palabra clave*_
βπ _${usedPrefix}eliminarvn *comando/palabra clave*_
βπ _${usedPrefix}eliminarvideo *comando/palabra clave*_
βπ _${usedPrefix}eliminaraudio *comando/palabra clave*_
βπ _${usedPrefix}eliminarimg *comando/palabra clave*_
βπ _${usedPrefix}eliminarsticker *comando/palabra clave*_

              *γ π πππ©π πΏππ€π¨ π γ*`.trim()
    let mentionedJid = [who]
    conn.sendFile(m.chat, pp, 'lp.jpg', str, m, false, { contextInfo: { mentionedJid }})
  }
}
handler.help = ['menusimple']
handler.tags = ['General']
handler.command = /^(caja|Caja|almacen|Almacen|almacenamiento|cjalmacen|cajaalmacenamiento|cajalmacenamiento|menucaja|menualmacen|Menucaja|Menualmacen)$/i
handler.rowner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler
