import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json, boolean, decimal } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Mood entries for emotion tracking
 */
export const moods = mysqlTable("moods", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  mood: int("mood").notNull(), // 1-5 scale or emoji index
  moodLabel: varchar("moodLabel", { length: 50 }), // "happy", "sad", "anxious", etc.
  notes: text("notes"), // Optional user notes
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Mood = typeof moods.$inferSelect;
export type InsertMood = typeof moods.$inferInsert;

/**
 * Chat messages for AI companion
 */
export const chatMessages = mysqlTable("chatMessages", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  role: mysqlEnum("role", ["user", "assistant"]).notNull(),
  content: text("content").notNull(),
  emotionDetected: varchar("emotionDetected", { length: 50 }), // Detected emotion from message
  distressLevel: int("distressLevel"), // 0-10 scale for crisis detection
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

/**
 * Trusted contacts for crisis alerts
 */
export const trustedContacts = mysqlTable("trustedContacts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  relationship: varchar("relationship", { length: 100 }), // "friend", "family", "mentor", etc.
  notifyVia: mysqlEnum("notifyVia", ["email", "inApp", "both"]).default("both").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TrustedContact = typeof trustedContacts.$inferSelect;
export type InsertTrustedContact = typeof trustedContacts.$inferInsert;

/**
 * Daily habits for wellness tracking
 */
export const habits = mysqlTable("habits", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  habitType: mysqlEnum("habitType", ["breathing", "gratitude", "hydration", "exercise", "meditation", "journaling"]).notNull(),
  currentStreak: int("currentStreak").default(0).notNull(),
  longestStreak: int("longestStreak").default(0).notNull(),
  completedToday: boolean("completedToday").default(false).notNull(),
  lastCompletedAt: timestamp("lastCompletedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Habit = typeof habits.$inferSelect;
export type InsertHabit = typeof habits.$inferInsert;

/**
 * Habit completions for daily tracking
 */
export const habitCompletions = mysqlTable("habitCompletions", {
  id: int("id").autoincrement().primaryKey(),
  habitId: int("habitId").notNull(),
  userId: int("userId").notNull(),
  completedAt: timestamp("completedAt").defaultNow().notNull(),
});

export type HabitCompletion = typeof habitCompletions.$inferSelect;
export type InsertHabitCompletion = typeof habitCompletions.$inferInsert;

/**
 * Anonymous community posts
 */
export const communityPosts = mysqlTable("communityPosts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(), // Store user ID for moderation, but display as anonymous
  content: text("content").notNull(),
  anonymousName: varchar("anonymousName", { length: 100 }), // Random anonymous name
  reactions: json("reactions").$type<Record<string, number>>().default({}).notNull(), // {emoji: count}
  replyCount: int("replyCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CommunityPost = typeof communityPosts.$inferSelect;
export type InsertCommunityPost = typeof communityPosts.$inferInsert;

/**
 * Community post replies
 */
export const communityReplies = mysqlTable("communityReplies", {
  id: int("id").autoincrement().primaryKey(),
  postId: int("postId").notNull(),
  userId: int("userId").notNull(),
  content: text("content").notNull(),
  anonymousName: varchar("anonymousName", { length: 100 }),
  reactions: json("reactions").$type<Record<string, number>>().default({}).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CommunityReply = typeof communityReplies.$inferSelect;
export type InsertCommunityReply = typeof communityReplies.$inferInsert;

/**
 * Local support resources (clinics, counselors, groups)
 */
export const supportResources = mysqlTable("supportResources", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  resourceType: mysqlEnum("resourceType", ["clinic", "counselor", "group", "hotline", "online"]).notNull(),
  description: text("description"),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 320 }),
  website: varchar("website", { length: 500 }),
  address: text("address"),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  hours: varchar("hours", { length: 255 }), // "Mon-Fri 9am-5pm"
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type SupportResource = typeof supportResources.$inferSelect;
export type InsertSupportResource = typeof supportResources.$inferInsert;

/**
 * Weekly wellbeing reports
 */
export const weeklyReports = mysqlTable("weeklyReports", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  weekStartDate: timestamp("weekStartDate").notNull(),
  wellnessScore: int("wellnessScore"), // 0-100
  moodSummary: text("moodSummary"),
  habitSummary: text("habitSummary"),
  insights: text("insights"), // AI-generated insights
  recommendations: text("recommendations"), // Personalized coping strategies
  motivationalMessage: text("motivationalMessage"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type WeeklyReport = typeof weeklyReports.$inferSelect;
export type InsertWeeklyReport = typeof weeklyReports.$inferInsert;

/**
 * In-app and email notifications
 */
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: mysqlEnum("type", ["sos_alert", "distress_detected", "habit_reminder", "weekly_report", "contact_alert", "community_reply"]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content"),
  relatedUserId: int("relatedUserId"), // For SOS alerts, the user who triggered it
  isRead: boolean("isRead").default(false).notNull(),
  sentVia: mysqlEnum("sentVia", ["inApp", "email", "both"]).default("inApp").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

/**
 * Crisis SOS events for tracking
 */
export const sosEvents = mysqlTable("sosEvents", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  triggerType: mysqlEnum("triggerType", ["manual_sos", "distress_detected"]).notNull(),
  distressLevel: int("distressLevel"), // 0-10
  notificationsSent: int("notificationsSent").default(0).notNull(),
  resolved: boolean("resolved").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type SosEvent = typeof sosEvents.$inferSelect;
export type InsertSosEvent = typeof sosEvents.$inferInsert;

/**
 * Relations for foreign keys (defined after all tables)
 */
export const usersRelations = relations(users, ({ many }) => ({
  moods: many(moods),
  chatMessages: many(chatMessages),
  trustedContacts: many(trustedContacts),
  habits: many(habits),
  communityPosts: many(communityPosts),
  weeklyReports: many(weeklyReports),
  notifications: many(notifications),
  sosEvents: many(sosEvents),
}));

export const moodsRelations = relations(moods, ({ one }) => ({
  user: one(users, { fields: [moods.userId], references: [users.id] }),
}));

export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  user: one(users, { fields: [chatMessages.userId], references: [users.id] }),
}));

export const trustedContactsRelations = relations(trustedContacts, ({ one }) => ({
  user: one(users, { fields: [trustedContacts.userId], references: [users.id] }),
}));

export const habitsRelations = relations(habits, ({ one, many }) => ({
  user: one(users, { fields: [habits.userId], references: [users.id] }),
  completions: many(habitCompletions),
}));

export const habitCompletionsRelations = relations(habitCompletions, ({ one }) => ({
  habit: one(habits, { fields: [habitCompletions.habitId], references: [habits.id] }),
  user: one(users, { fields: [habitCompletions.userId], references: [users.id] }),
}));

export const communityPostsRelations = relations(communityPosts, ({ one, many }) => ({
  user: one(users, { fields: [communityPosts.userId], references: [users.id] }),
  replies: many(communityReplies),
}));

export const communityRepliesRelations = relations(communityReplies, ({ one }) => ({
  post: one(communityPosts, { fields: [communityReplies.postId], references: [communityPosts.id] }),
  user: one(users, { fields: [communityReplies.userId], references: [users.id] }),
}));

export const weeklyReportsRelations = relations(weeklyReports, ({ one }) => ({
  user: one(users, { fields: [weeklyReports.userId], references: [users.id] }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, { fields: [notifications.userId], references: [users.id] }),
  relatedUser: one(users, { fields: [notifications.relatedUserId], references: [users.id] }),
}));

export const sosEventsRelations = relations(sosEvents, ({ one }) => ({
  user: one(users, { fields: [sosEvents.userId], references: [users.id] }),
}));
