package com.tunemate.tunemateplaylist.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class TrackDeleteDto {

    private String uri;

    private List<Integer> positions;
}
