import { useMutation } from 'convex/react';
import { FunctionReference } from 'convex/server';
import { useState } from 'react';

const useMutationState = (mutationToRun: FunctionReference<'mutation'>) => {
  const [pending, setPending] = useState(false);

  const mutationFn = useMutation(mutationToRun);

  const mutate = async (payload: unknown) => {
    setPending(true);
    return mutationFn(payload)
      .then((res) => res)
      .catch((err) => {
        throw err;
      })
      .finally(() => setPending(false));
  };

  return { mutate, pending };
};

export default useMutationState;
