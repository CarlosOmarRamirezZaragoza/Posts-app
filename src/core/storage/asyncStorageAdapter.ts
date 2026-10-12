/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: AsyncStorage adapter for Zustand persist middleware.
 *
 * Zustand's persist middleware needs a storage object conforming to PersistStorage<T>.
 * AsyncStorage has a slightly different API (returns null instead of undefined),
 * so we wrap it here once rather than repeating the adaptation in every store.
 * This follows the Adapter pattern — isolating the framework detail from the store.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage } from 'zustand/middleware';

// createJSONStorage wraps any async storage object into the format zustand's
// persist middleware expects. We export this ready-to-use adapter.
export const zustandAsyncStorage = createJSONStorage(() => AsyncStorage);
