# Como obter uma chave de API da NASA (Gratuita)

## Por que preciso de uma chave de API?

A chave DEMO_KEY tem limitações severas:
- Apenas 30 requisições por hora
- 50 requisições por dia

Com uma chave pessoal gratuita você terá:
- 1000 requisições por hora
- Sem limite diário

## Passos para obter sua chave:

1. **Acesse o site da NASA API**
   - Vá para: https://api.nasa.gov

2. **Clique em "Generate API Key"**
   - Preencha o formulário simples
   - Nome, sobrenome e email
   - Uso pretendido (pode colocar "Educational" ou "Personal Project")

3. **Receba a chave por email**
   - A chave será enviada instantaneamente para seu email
   - Copie a chave recebida

4. **Configure no projeto**
   - Abra o arquivo `.env.local` na raiz do projeto
   - Substitua `DEMO_KEY` pela sua chave:
   ```
   NEXT_PUBLIC_NASA_API_KEY=sua_chave_aqui
   ```

5. **Reinicie o servidor**
   - Pare o servidor (Ctrl+C)
   - Execute novamente: `npm run dev`

## Importante

- A chave é gratuita e não expira
- Você pode usar em projetos pessoais e educacionais
- Não compartilhe sua chave publicamente
- Cada chave é única e rastreável

## Problemas comuns

Se continuar recebendo erro 429:
1. Verifique se salvou corretamente o arquivo `.env.local`
2. Certifique-se de reiniciar o servidor
3. Aguarde alguns minutos (o cache da aplicação ajudará)
4. Tente selecionar uma data específica nos filtros