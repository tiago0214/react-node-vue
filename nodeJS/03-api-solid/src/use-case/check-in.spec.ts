import { InMemoryCheckInsRepository } from "@/repository/in-memory/in-memory-check-ins-repository";
import { describe, expect, it, beforeEach, vi, afterEach } from "vitest";
import { CheckInUseCase } from "./check-in";

let checkInRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe("check in use case", () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "123",
      userId: "321",
    });

    console.log(checkIn.created_at);

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("shouldn't be able to check twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "123",
      userId: "321",
    });

    expect(async () => {
      await sut.execute({
        gymId: "123",
        userId: "321",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
