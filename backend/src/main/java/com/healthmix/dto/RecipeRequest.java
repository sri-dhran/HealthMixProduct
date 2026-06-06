package com.healthmix.dto;

import java.util.List;

public class RecipeRequest {
    private List<String> ingredients;
    private String goals;

    public List<String> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }

    public String getGoals() {
        return goals;
    }

    public void setGoals(String goals) {
        this.goals = goals;
    }
}
