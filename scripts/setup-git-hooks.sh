# Set commit-msg hook
echo '#!/bin/sh
npx --no -- commitlint --edit "$1"' >.git/hooks/commit-msg
chmod +x .git/hooks/commit-msg
