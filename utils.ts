import { BriefingData } from './types';

const PHONE_NUMBER = '5553991257648';

export const formatBriefingMessage = (data: BriefingData): string => {
  const {
    nome,
    empresa,
    whatsapp,
    email,
    instagram,
    oQueFaz,
    principalServico,
    tipoCliente,
    objetivoSite,
    objetivoOutro,
    canalAtual,
    canalOutro,
    ideiaInicial,
    referencia,
    estiloPreferencia,
    complexidade,
    observacoes,
  } = data;

  const lines = [
    `*NOVO BRIEFING - AXIUM WEB*`,
    `🚀 *Cliente:* ${nome}`,
    `🏢 *Empresa:* ${empresa}`,
    `----------------------------------`,
    ``,
    `*1. CONTATO*`,
    `📱 WhatsApp: ${whatsapp}`,
    `📧 E-mail: ${email}`,
    `🔗 Insta/Site: ${instagram || 'Não informado'}`,
    ``,
    `*2. SOBRE O NEGÓCIO*`,
    `🔹 *O que faz:* ${oQueFaz}`,
    `🔹 *Foco:* ${principalServico}`,
    `🔹 *Público:* ${tipoCliente}`,
    ``,
    `*3. OBJETIVO DO SITE*`,
    `🎯 ${objetivoSite === 'Outro' ? objetivoOutro : objetivoSite}`,
    ``,
    `*4. FUNIL ATUAL*`,
    `📥 ${canalAtual === 'Outro' ? canalOutro : canalAtual}`,
    ``,
    `*5. CONTEÚDO E IDEIA*`,
    `💡 *Ideia:* ${ideiaInicial || 'Não informado'}`,
    `🌐 *Ref:* ${referencia || 'Nenhuma'}`,
    `🎨 *Estilo:* ${estiloPreferencia}`,
    ``,
    `*6. COMPLEXIDADE ESTIMADA*`,
    `📊 ${complexidade}`,
    ``,
    `*7. OBSERVAÇÕES*`,
    `📝 ${observacoes || 'Nenhuma'}`,
    ``,
    `----------------------------------`,
    `_Enviado via Formulário Online Axium Web_`,
  ];

  return lines.join('\n');
};

export const openWhatsApp = (data: BriefingData) => {
  const message = formatBriefingMessage(data);
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`;
  window.open(url, '_blank');
};