import { BorshCoder, Idl, InstructionNamespace } from '@project-serum/anchor';
import InstructionNamespaceFactory from '@project-serum/anchor/dist/cjs/program/namespace/instruction';
import { AllInstructions } from '@project-serum/anchor/dist/cjs/program/namespace/types';
import { PublicKey } from '@solana/web3.js';
import camelcase from 'camelcase';
import { IDL as UXD_IDL } from './idl';

export default class NamespaceFactory {
  public static buildInstructionNamespace<IDL extends Idl>(
    idl: typeof UXD_IDL,
    programId: PublicKey
  ): InstructionNamespace<IDL> {
    const instruction: InstructionNamespace = {};

    idl.instructions.forEach(<I extends AllInstructions<IDL>>(idlIx: I) => {
      const ixItem = InstructionNamespaceFactory.build<IDL, I>(
        idlIx,
        (ixName, ix) => new BorshCoder(idl).instruction.encode(ixName, ix),
        programId
      );
      const name = camelcase(idlIx.name);
      // @ts-expect-error Type 'InstructionFn<IDL, I>' is not assignable to type 'InstructionContextFn<Idl, IdlInstruction & { name: string; }, TransactionInstruction> & { accounts: (ctx: Accounts<...>) => unknown; }'.
      instruction[name] = ixItem;
    });

    return instruction as InstructionNamespace<IDL>;
  }
}
