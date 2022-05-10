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
      // src/namespace.ts:22:7 - error TS2322: Type 'InstructionFn<IDL, I>' is not assignable to type 'InstructionContextFn<Idl, IdlInstruction & { name: string; }, TransactionInstruction> & { accounts: (ctx: Accounts<...>) => unknown; }'.
      // Type 'InstructionFn<IDL, I>' is not assignable to type 'InstructionContextFn<Idl, IdlInstruction & { name: string; }, TransactionInstruction>'.
      //   Types of parameters 'args_0' and 'args_0' are incompatible.
      //     Type '[...unknown[], Context<Accounts<IdlAccountItem>>]' is not assignable to type '[...(I["args"][number] extends IdlField ? DecodeType<I["args"][number]["type"], IdlTypes<IDL>> : unknown)[], Context<Accounts<I["accounts"][number]>
      // >]'.
      //       Type at position 0 in source is not compatible with type at position 0 in target.
      //         Type 'unknown' is not assignable to type 'I["args"][number] extends IdlField ? DecodeType<I["args"][number]["type"], IdlTypes<IDL>> : unknown'.
      //          
      // @ts-ignore
      instruction[name] = ixItem;
    });

    return instruction as InstructionNamespace<IDL>;
  }
}
