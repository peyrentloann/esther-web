export default function SetupNeeded({ message }: { message?: string }) {
  return (
    <div className="bg-tertiary-fixed/40 border border-tertiary-fixed-dim rounded-2xl p-10 max-w-2xl">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-tertiary-fixed-dim rounded-full flex items-center justify-center text-2xl shrink-0">
          ⚙
        </div>
        <div className="space-y-4">
          <h3 className="font-serif text-2xl text-tertiary">Setup à terminer</h3>
          <p className="text-on-surface-variant">
            La base de données n&apos;est pas encore configurée. Pour activer les rendez-vous,
            la liste des clientes et le dashboard, exécute la migration SQL dans Supabase :
          </p>
          <ol className="text-sm text-on-surface-variant space-y-2 list-decimal list-inside">
            <li>
              Va sur{" "}
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noreferrer"
                className="text-primary underline underline-offset-2"
              >
                supabase.com/dashboard
              </a>{" "}
              → ton projet → <strong>SQL Editor</strong>
            </li>
            <li>
              Copie/colle le contenu du fichier <code className="bg-surface px-1.5 py-0.5 rounded text-xs">supabase/0001_init.sql</code> du repo
            </li>
            <li>Clique <strong>Run</strong></li>
            <li>Reviens ici et rafraîchis la page</li>
          </ol>
          {message && (
            <p className="text-xs text-outline italic mt-4 font-mono">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
