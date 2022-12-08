import { getCurrentPages } from '@tarojs/taro';
import JSEncrypt from './jsencrypt';
import {
  // abob,
  btoa,
} from './base64';

// 简单混淆一下
const RSA_PUB_KEY_ARR =
  'M_I_G_f_M_A_0_G_C_S_q_G_S_I_b_3_D_Q_E_B_A_Q_U_A_A_4_G_N_A_D_C_B_i_Q_K_B_g_Q_D_Q_D_c_O_W_s_g_z_q_C_x_m_A_l_J_n_x_T_2_J_d_9_O_c_C_B_7_G_G_K_M_l_l_w_+_x_C_g_K_J_V_Z_m_5_U_p_b_X_g_d_Y_O_t_m_I_R_H_2_w_N_w_4_t_k_X_M_B_2_J_X_C_/_s_U_g_m_i_E_p_b_9_D_N_i_4_3_U_q_6_8_U_Y_2_L_c_v_W_d_F_/_9_d_S_r_7_n_Y_5_6_k_t_0_2_H_A_/_L_F_/_S_T_1_L_G_A_y_E_R_D_i_m_9_P_+_N_d_5_Z_R_5_W_N_y_/_a_d_q_e_H_J_p_k_L_C_J_5_N_G_n_+_s_9_M_c_k_a_b_k_J_y_Q_I_D_A_Q_A_B'.split(
    '_'
  );

// DH（密钥交换协议/算法(Diffie-Hellman)简称，RSA加密算法实现了它
// RSA 加密，加密前会统一base64一次
// 需要注意RSA算法本身要求加密内容也就是明文长度m必须0<m<密钥长度n，如果小于这个长度就需要进行padding，因为如果没有padding，就无法确定解密后内容的真实长度，字符串之类的内容问题还不大，以0作为结束符，但对二进制数据就很难，因为不确定后面的0是内容还是内容结束符。而只要用到padding，那么就要占用实际的明文长度，于是实际明文长度需要减去padding字节长度。我们一般使用的padding标准有NoPPadding、OAEPPadding、PKCS1Padding等，其中PKCS#1建议的padding就占用了11个字节。
// 这样，对于1024长度的密钥。128字节（1024bits）-减去11字节正好是117字节，但对于RSA加密来讲，padding也是参与加密的，所以，依然按照1024bits去理解，但实际的明文只有117字节了。
// 所以如果要对任意长度的数据进行加密，就需要将数据分段后进行逐一加密，并将结果进行拼接。同样，解码也需要分段解码，并将结果进行拼接。
// 故此：超长可能需要分段，或者先对称加密后使用非对称加密来加密对称加密的密钥等方法处理

const encodeBase64 = () => {};
const mergeUrlQuery = () => {};

// 1024 bits 最大位数
const MAX = 128 - 11;
// instance
let encrypt;

/**
 * 执行单纯的 RSA 加密, 不包装任何其他编解码
 * @param {*} val
 * @returns
 */
function toEncrypt(val) {
  if (encrypt == null) {
    // 内含小于长度的padding处理
    encrypt = new JSEncrypt();
    encrypt.setPublicKey(RSA_PUB_KEY_ARR.join(''));
  }
  const result = encrypt.encrypt(val);
  if (result) {
    return result;
  }
  const msg = `Encrypt failed: ${val}`;
  throw new Error(msg);
}

export function RSAEncrypt(val) {
  if (val == null) {
    return null;
  }
  // encodeBase64 内置 encode url
  return toEncrypt(encodeBase64(val, false, btoa));
}

/**
 * 长字符串 分段 RSA, 由于先切割固定长度再调用上面的 RSAEncrypt 可能造成超长(如中文), 因为是每个一段独立先 urlencode 然后 base64, 造成最终RSA加密的明文长度不可控
 * 这里使用独立的差异实现, 先整体 encode url, base64 得到确定的长度后, 再按固定长度分片执行RSA
 * @param {*} string
 * @returns
 */
export function RSAEncryptArray(string) {
  if (string == null) {
    return [];
  }
  const list = [];
  // encodeBase64 内置 encode url
  let temp = encodeBase64(string, false, btoa);
  for (; temp.length > 0; ) {
    list.push(temp.slice(0, MAX));
    temp = temp.slice(MAX);
  }
  return list.map(val => toEncrypt(val));
}

export function getCurrentUrl() {
  const pages = getCurrentPages();
  const page = pages[pages.length - 1];
  const { route, options } = page;
  return mergeUrlQuery(`/${route}`, options);
}
