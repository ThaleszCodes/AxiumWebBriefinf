import React, { useState } from 'react';
import { BriefingData, INITIAL_DATA } from './types';
import { openWhatsApp, formatBriefingMessage } from './utils';
import { FormSection } from './components/FormSection';
import { TextField, TextAreaField, RadioGroup } from './components/InputComponents';
import { Send, CheckCircle2, AlertCircle, Copy, Rocket, Star, TrendingUp, Monitor } from 'lucide-react';

const App: React.FC = () => {
  const [formData, setFormData] = useState<BriefingData>(INITIAL_DATA);
  const [errors, setErrors] = useState<Partial<Record<keyof BriefingData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  const handleChange = (field: keyof BriefingData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BriefingData, string>> = {};

    if (!formData.nome.trim()) newErrors.nome = 'Precisamos saber quem você é.';
    if (!formData.empresa.trim()) newErrors.empresa = 'O nome da sua marca é fundamental.';
    if (!formData.whatsapp.trim()) newErrors.whatsapp = 'Precisamos do WhatsApp para enviar a proposta.';
    if (!formData.oQueFaz.trim()) newErrors.oQueFaz = 'Conte um pouco mais para sermos assertivos.';
    if (!formData.tipoCliente) newErrors.tipoCliente = 'Selecione uma opção.';
    if (!formData.objetivoSite) newErrors.objetivoSite = 'Selecione o foco principal.';
    if (formData.objetivoSite === 'Outro' && !formData.objetivoOutro.trim()) newErrors.objetivoOutro = 'Especifique seu objetivo.';
    if (!formData.canalAtual) newErrors.canalAtual = 'Selecione uma opção.';
    if (formData.canalAtual === 'Outro' && !formData.canalOutro.trim()) newErrors.canalOutro = 'Especifique o canal.';
    if (!formData.estiloPreferencia) newErrors.estiloPreferencia = 'Selecione uma preferência.';
    if (!formData.complexidade) newErrors.complexidade = 'Selecione uma estimativa.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setIsSubmitting(true);
      
      setTimeout(() => {
        openWhatsApp(formData);
        setSubmitted(true);
        setIsSubmitting(false);
      }, 800);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      alert("Para criar a melhor estratégia, precisamos de todos os campos obrigatórios preenchidos.");
    }
  };

  const handleCopyToClipboard = () => {
    const text = formatBriefingMessage(formData);
    navigator.clipboard.writeText(text).then(() => {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border-t-4 border-indigo-600">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Sucesso! 🚀</h2>
          <p className="text-slate-600 mb-8 text-lg">
            Você deu o primeiro passo para transformar sua presença digital. Se o WhatsApp não abriu, clique abaixo.
          </p>
          
          <div className="space-y-4">
             <button
              onClick={() => openWhatsApp(formData)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Confirmar no WhatsApp
            </button>
            
            <button
              onClick={handleCopyToClipboard}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {copyFeedback ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copyFeedback ? 'Copiado!' : 'Copiar respostas'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24 font-sans selection:bg-indigo-200 selection:text-indigo-900">
      
      {/* Premium Dark Header */}
      <div className="bg-[#0f172a] text-white pt-12 pb-24 px-4 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 rounded-full blur-[120px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full blur-[100px] opacity-20 transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-900/50 border border-indigo-700/50 px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-xs md:text-sm font-medium text-indigo-100 tracking-wide uppercase">Briefing Exclusivo Axium Web</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Não é apenas um site.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              É sua nova autoridade.
            </span>
          </h1>
          
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Você está a poucos passos de ter uma presença digital que vende, convence e posiciona sua marca no topo. Vamos estruturar sua visão?
          </p>
        </div>
      </div>

      {/* Value Proposition Cards - Floating effect overlapping header */}
      <div className="max-w-4xl mx-auto px-4 -mt-16 relative z-20 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 flex flex-col items-center text-center hover:transform hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-slate-800">Mais Vendas</h3>
            <p className="text-sm text-slate-500 mt-1">Um site estratégico trabalha 24h por dia convertendo visitantes em clientes.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 flex flex-col items-center text-center hover:transform hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-3">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-slate-800">Autoridade</h3>
            <p className="text-sm text-slate-500 mt-1">Passe credibilidade imediata. Não seja confundido com amadores.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 flex flex-col items-center text-center hover:transform hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-3">
              <Monitor className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="font-bold text-slate-800">Design Premium</h3>
            <p className="text-sm text-slate-500 mt-1">Visual moderno e responsivo, focado na experiência do usuário.</p>
          </div>
        </div>
      </div>

      {/* Main Content Form */}
      <main className="max-w-2xl mx-auto px-4">
        
        {/* 1. Identificação */}
        <FormSection title="1. Quem vai escalar esse negócio?" description="Precisamos saber quem está por trás do projeto.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              label="Seu Nome"
              placeholder="Ex: João Silva"
              value={formData.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
              error={errors.nome}
              required
            />
            <TextField
              label="Nome da Empresa / Marca"
              placeholder="Ex: Silva Consultoria"
              value={formData.empresa}
              onChange={(e) => handleChange('empresa', e.target.value)}
              error={errors.empresa}
              required
            />
          </div>
          <TextField
            label="WhatsApp Principal"
            placeholder="Ex: (00) 90000-0000"
            type="tel"
            value={formData.whatsapp}
            onChange={(e) => handleChange('whatsapp', e.target.value)}
            error={errors.whatsapp}
            required
            className="mb-2"
          />
          <p className="text-xs text-slate-400 mb-4 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Fique tranquilo, não enviamos spam. Apenas o orçamento.
          </p>

          <TextField
            label="E-mail Comercial"
            placeholder="Ex: contato@suaempresa.com"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          <TextField
            label="Instagram ou Site atual"
            placeholder="Para analisarmos seu posicionamento atual"
            value={formData.instagram}
            onChange={(e) => handleChange('instagram', e.target.value)}
          />
        </FormSection>

        {/* 2. Sobre o Negócio */}
        <FormSection title="2. A essência do seu negócio" description="Para vender, precisamos entender o que você tem de melhor.">
          <TextAreaField
            label="O que sua empresa faz?"
            placeholder="Explique como se estivesse vendendo para um cliente agora. Qual problema você resolve?"
            value={formData.oQueFaz}
            onChange={(e) => handleChange('oQueFaz', e.target.value)}
            error={errors.oQueFaz}
            required
          />
          <TextField
            label="Qual é o seu produto/serviço 'Carro Chefe'?"
            placeholder="Aquele que você mais quer vender com o site"
            value={formData.principalServico}
            onChange={(e) => handleChange('principalServico', e.target.value)}
          />
          <RadioGroup
            label="Quem é seu cliente ideal?"
            name="tipoCliente"
            options={[
              { label: 'Pessoas Físicas (B2C)', value: 'Pessoas Físicas' },
              { label: 'Empresas (B2B)', value: 'Empresas (B2B)' },
              { label: 'Ambos', value: 'Ambos' },
            ]}
            selectedValue={formData.tipoCliente}
            onChange={(val) => handleChange('tipoCliente', val)}
            error={errors.tipoCliente}
          />
        </FormSection>

        {/* 3. Objetivo */}
        <FormSection title="3. Onde queremos chegar?" description="Definir o objetivo é o segredo de um site que dá retorno.">
          <RadioGroup
            label="Qual é a META principal deste site?"
            name="objetivo"
            options={[
              { label: 'Gerar leads no WhatsApp (Venda rápida)', value: 'Gerar contatos no WhatsApp' },
              { label: 'Aumentar autoridade e vitrine (Institucional)', value: 'Apresentar melhor o serviço' },
              { label: 'Venda direta / E-commerce', value: 'Vender um produto/serviço' },
            ]}
            allowOther
            otherValue={formData.objetivoOutro}
            onOtherChange={(val) => handleChange('objetivoOutro', val)}
            selectedValue={formData.objetivoSite}
            onChange={(val) => handleChange('objetivoSite', val)}
            error={errors.objetivoSite || errors.objetivoOutro}
          />
        </FormSection>

        {/* 4. Funil */}
        <FormSection title="4. O caminho do cliente" description="Como o cliente interage com você hoje?">
          <RadioGroup
            label="Quando alguém se interessa, o que acontece?"
            name="canalAtual"
            options={[
              { label: 'Vai direto pro WhatsApp (Manual)', value: 'Vai direto pro WhatsApp' },
              { label: 'Me chama no Direct do Instagram', value: 'Instagram' },
              { label: 'Já tenho um site, mas não converte bem', value: 'Já tenho um site' },
            ]}
            allowOther
            otherValue={formData.canalOutro}
            onOtherChange={(val) => handleChange('canalOutro', val)}
            selectedValue={formData.canalAtual}
            onChange={(val) => handleChange('canalAtual', val)}
            error={errors.canalAtual || errors.canalOutro}
          />
        </FormSection>

        {/* 5. Conteúdo e Ideia */}
        <FormSection title="5. Visual e Inspiração" description="A parte divertida: como será a 'cara' da sua empresa.">
          <TextAreaField
            label="Você já imaginou como gostaria que o site fosse?"
            placeholder="Ex: Quero algo minimalista, cores escuras, fotos grandes..."
            value={formData.ideiaInicial}
            onChange={(e) => handleChange('ideiaInicial', e.target.value)}
          />
           <TextField
            label="Tem algum site de referência que você acha incrível? (Link)"
            placeholder="https://..."
            value={formData.referencia}
            onChange={(e) => handleChange('referencia', e.target.value)}
          />
           <RadioGroup
            label="Qual estilo combina mais com você?"
            name="estiloPreferencia"
            options={[
              { label: 'Clean, direto e objetivo', value: 'Simples e direto' },
              { label: 'Visual impactante e detalhado', value: 'Mais detalhado' },
              { label: 'Não sei, confio na visão da Axium', value: 'Preciso de orientação' },
            ]}
            selectedValue={formData.estiloPreferencia}
            onChange={(val) => handleChange('estiloPreferencia', val)}
            error={errors.estiloPreferencia}
          />
        </FormSection>

        {/* 6. Complexidade */}
        <FormSection title="6. Escopo do Projeto" description="Isso nos ajuda a precificar corretamente.">
           <RadioGroup
            label="O que você imagina para a estrutura?"
            name="complexidade"
            options={[
              { label: 'Landing Page (Página única de alta conversão)', value: 'Bem simples' },
              { label: 'Site Institucional (Home, Sobre, Serviços, Contato)', value: 'Médio' },
              { label: 'Projeto Personalizado / Sistema / Loja', value: 'Mais completo' },
            ]}
            selectedValue={formData.complexidade}
            onChange={(val) => handleChange('complexidade', val)}
            error={errors.complexidade}
          />
        </FormSection>

        {/* 7. Observações Finais */}
        <FormSection title="7. Detalhes Finais">
          <TextAreaField
            label="Algo mais que precisamos saber para o sucesso do projeto?"
            placeholder="Prazos desejados, funcionalidades específicas, dúvidas..."
            value={formData.observacoes}
            onChange={(e) => handleChange('observacoes', e.target.value)}
          />
        </FormSection>

        {/* Submit Area */}
        <div className="mt-12 mb-20">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-5 mb-8 flex gap-4 items-start shadow-sm">
            <Rocket className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-indigo-900 mb-1">Quase lá!</h4>
              <p className="text-sm text-indigo-700 leading-relaxed">
                Ao clicar abaixo, compilaremos suas respostas e abriremos o WhatsApp. <br/>
                <strong>Esse é o primeiro passo para o próximo nível do seu negócio.</strong>
              </p>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full py-5 px-6 rounded-xl font-bold text-white text-xl shadow-xl transform transition-all duration-300 
              ${isSubmitting 
                ? 'bg-slate-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-500 hover:to-purple-600 hover:scale-[1.02] hover:shadow-indigo-500/30'
              } flex items-center justify-center gap-3`}
          >
            {isSubmitting ? (
              'Gerando seu Briefing...'
            ) : (
              <>
                Solicitar Proposta Exclusiva <Send className="w-6 h-6" />
              </>
            )}
          </button>
          
          <div className="mt-8 flex items-center justify-center gap-2 text-slate-400 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Axium Web • Studio de Alta Performance
          </div>
        </div>

      </main>
    </div>
  );
};

export default App;