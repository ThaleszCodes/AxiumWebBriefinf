export interface BriefingData {
  // 1. Identificação
  nome: string;
  empresa: string;
  whatsapp: string;
  email: string;
  instagram: string;

  // 2. Sobre o Negócio
  oQueFaz: string;
  principalServico: string;
  tipoCliente: 'Pessoas Físicas' | 'Empresas (B2B)' | 'Ambos' | '';

  // 3. Objetivo
  objetivoSite: string;
  objetivoOutro: string; // Used if "Outro" is selected

  // 4. Como o cliente chega
  canalAtual: string;
  canalOutro: string; // Used if "Outro" is selected

  // 5. Conteúdo e Ideia
  ideiaInicial: string;
  referencia: string;
  estiloPreferencia: 'Simples e direto' | 'Mais detalhado' | 'Preciso de orientação' | '';

  // 6. Complexidade
  complexidade: 'Bem simples' | 'Médio' | 'Mais completo' | '';

  // 7. Observações
  observacoes: string;
}

export const INITIAL_DATA: BriefingData = {
  nome: '',
  empresa: '',
  whatsapp: '',
  email: '',
  instagram: '',
  oQueFaz: '',
  principalServico: '',
  tipoCliente: '',
  objetivoSite: '',
  objetivoOutro: '',
  canalAtual: '',
  canalOutro: '',
  ideiaInicial: '',
  referencia: '',
  estiloPreferencia: '',
  complexidade: '',
  observacoes: '',
};