# bancadadev

MVP em Next.js, Supabase e Vercel.

## Configuração

1. Crie um projeto no Supabase e execute `supabase/migrations/001_profiles.sql` no SQL Editor.
2. Em **Authentication > Providers**, habilite Google. Em **URL Configuration**, adicione `http://localhost:3000/auth/callback` e a URL de produção seguida de `/auth/callback` nas Redirect URLs.
3. Copie `.env.example` para `.env.local` e preencha as três variáveis.
4. No projeto Vercel, configure as mesmas variáveis para Production, Preview e Development.

`public/prova.svg` é a prova exibida e baixada; substitua o arquivo pelo material final mantendo o nome, ou ajuste as duas referências em `components/ProofCard.tsx`.
