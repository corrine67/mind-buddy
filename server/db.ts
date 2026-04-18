import { eq, desc, and, gte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, moods, chatMessages, trustedContacts, habits, habitCompletions, communityPosts, communityReplies, notifications, weeklyReports, sosEvents } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Mood queries
export async function saveMood(userId: number, mood: number, moodLabel: string, notes?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(moods).values({
    userId,
    mood,
    moodLabel,
    notes,
  });
}

export async function getUserMoods(userId: number, limit = 30) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db
    .select()
    .from(moods)
    .where(eq(moods.userId, userId))
    .orderBy(desc(moods.createdAt))
    .limit(limit);
}

// Chat queries
export async function saveChatMessage(userId: number, role: "user" | "assistant", content: string, emotionDetected?: string, distressLevel?: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(chatMessages).values({
    userId,
    role,
    content,
    emotionDetected,
    distressLevel,
  });
}

export async function getUserChatHistory(userId: number, limit = 50) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db
    .select()
    .from(chatMessages)
    .where(eq(chatMessages.userId, userId))
    .orderBy(desc(chatMessages.createdAt))
    .limit(limit);
}

// Trusted contacts
export async function saveTrustedContact(userId: number, name: string, email?: string, phone?: string, relationship?: string, notifyVia: "email" | "inApp" | "both" = "both") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(trustedContacts).values({
    userId,
    name,
    email,
    phone,
    relationship,
    notifyVia,
  });
}

export async function getUserTrustedContacts(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db
    .select()
    .from(trustedContacts)
    .where(eq(trustedContacts.userId, userId));
}

// Habits
export async function getUserHabits(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db
    .select()
    .from(habits)
    .where(eq(habits.userId, userId));
}

export async function completeHabit(habitId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Update habit streak
  await db.update(habits)
    .set({
      completedToday: true,
      lastCompletedAt: new Date(),
    })
    .where(eq(habits.id, habitId));
  
  // Log completion in habitCompletions table
  return await db.insert(habitCompletions).values({
    habitId,
    userId,
  });
}

// Community posts
export async function createCommunityPost(userId: number, content: string, anonymousName: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(communityPosts).values({
    userId,
    content,
    anonymousName,
  });
}

export async function getCommunityPosts(limit = 20) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db
    .select()
    .from(communityPosts)
    .orderBy(desc(communityPosts.createdAt))
    .limit(limit);
}

// Notifications
export async function createNotification(userId: number, type: string, title: string, content?: string, relatedUserId?: number, sentVia: "inApp" | "email" | "both" = "inApp") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(notifications).values({
    userId,
    type: type as any,
    title,
    content,
    relatedUserId,
    sentVia,
  });
}

export async function getUserNotifications(userId: number, limit = 20) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, userId))
    .orderBy(desc(notifications.createdAt))
    .limit(limit);
}

// SOS Events
export async function createSosEvent(userId: number, triggerType: "manual_sos" | "distress_detected", distressLevel?: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(sosEvents).values({
    userId,
    triggerType,
    distressLevel,
  });
}

export async function getUserSosEvents(userId: number, limit = 10) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db
    .select()
    .from(sosEvents)
    .where(eq(sosEvents.userId, userId))
    .orderBy(desc(sosEvents.createdAt))
    .limit(limit);
}

// Weekly reports
export async function createWeeklyReport(userId: number, weekStartDate: Date, wellnessScore: number, moodSummary?: string, habitSummary?: string, insights?: string, recommendations?: string, motivationalMessage?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(weeklyReports).values({
    userId,
    weekStartDate,
    wellnessScore,
    moodSummary,
    habitSummary,
    insights,
    recommendations,
    motivationalMessage,
  });
}

export async function getUserWeeklyReport(userId: number, weekStartDate: Date) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db
    .select()
    .from(weeklyReports)
    .where(and(
      eq(weeklyReports.userId, userId),
      eq(weeklyReports.weekStartDate, weekStartDate)
    ))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}
